import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import nextConnect from "next-connect";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  try {
    const fileStr = req.file.buffer.toString("base64");
    const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${fileStr}`);
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default apiRoute;

export const config = {
  api: { bodyParser: false },
};
