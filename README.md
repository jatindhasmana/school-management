📘 School Management App

A full-stack web application to add, view, and manage schools with image uploads.
Built with Next.js (App Router), MySQL, Cloudinary, and deployed on Vercel + Railway.

🚀 Features

Add schools with details (name, address, city, state, contact, email, image)

Upload school images directly to Cloudinary

Store only image URLs in MySQL (lightweight & scalable)

View schools in a responsive grid layout

Styled with Tailwind CSS (modern floating labels UI)

Deployed using Vercel (frontend/backend) + Railway (database)

🛠️ Tech Stack

Frontend: Next.js (App Router), React, Tailwind CSS

Backend: Next.js API routes

Database: MySQL (hosted on Railway)

Storage: Cloudinary

Deployment: Vercel

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

2️⃣ Install dependencies
npm install

3️⃣ Environment Variables

Create a .env.local file in the root directory and add:

# MySQL (Railway)
MYSQLHOST=yamanote.proxy.rlwy.net
MYSQLPORT=58777
MYSQLUSER=root
MYSQLPASSWORD=your_db_password
MYSQLDATABASE=railway
DB_SSL=true

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


⚠️ Replace values with your actual Railway + Cloudinary credentials.

4️⃣ Run locally
npm run dev


Now open 👉 http://localhost:3000

🌐 Deployment
Vercel (Frontend + API)

Connect this repo to Vercel

Add the same environment variables in:
Project → Settings → Environment Variables

Redeploy

Railway (Database)

Create a MySQL service on Railway

Copy the connection credentials (host, port, user, password, database)

Use them in .env.local and Vercel env vars

📂 Project Structure
app/
 ├─ addSchool/          # Add School form (frontend)
 ├─ showSchools/        # Display all schools
 ├─ api/
 │   ├─ schools/        # API routes for CRUD schools
 │   └─ upload/         # Cloudinary upload API
lib/
 └─ db.js               # MySQL connection pool

🔮 Future Improvements

Edit/Delete schools

Search & filter schools

Admin authentication

Pagination & performance improvements

👨‍💻 Author

Jatin Dhasmana
