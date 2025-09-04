"use client";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const onSubmit = async () => {
    try {
      setLoading(true);

      // 1) Upload image to Cloudinary
      const f = getValues("image")?.[0];
      if (!f) { alert("Please select an image"); return; }

      const fd = new FormData();
      fd.append("file", f);
      const upRes = await fetch("/api/upload", { method: "POST", body: fd });
      const upJson = await upRes.json();
      if (!upRes.ok) { alert(upJson.error || "Image upload failed"); return; }

      // 2) Send only text fields + Cloudinary URL (no FileList in JSON)
      const { name, address, city, state, contact, email_id } = getValues();
      const payload = { name, address, city, state, contact, email_id, image: upJson.url };

      const res = await fetch("/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to add school");
        return;
      }

      alert("School added successfully!");
      reset();
      if (fileRef.current) fileRef.current.value = ""; // clear file input
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-100 to-indigo-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-violet-700 mb-6">Add a New School</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="text" placeholder="School Name"
            {...register("name", { required: "School name is required" })}
            className="w-full px-4 py-2 border rounded-lg" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input type="text" placeholder="Address"
            {...register("address", { required: "Address is required" })}
            className="w-full px-4 py-2 border rounded-lg" />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City"
              {...register("city", { required: "City is required" })}
              className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" placeholder="State"
              {...register("state", { required: "State is required" })}
              className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Contact Number"
              {...register("contact", { required: "Contact is required" })}
              className="w-full px-4 py-2 border rounded-lg" />
            <input type="email" placeholder="Email Address"
              {...register("email_id", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <input type="file" accept="image/*" ref={fileRef}
            {...register("image", { required: "Image is required" })}
            className="w-full px-4 py-2 border rounded-lg" />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-lg text-white bg-violet-600 hover:bg-violet-700">
            {loading ? "Adding..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
}
