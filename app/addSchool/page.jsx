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

      const f = getValues("image")?.[0];
      if (!f) { alert("Please select an image"); return; }

      const fd = new FormData();
      fd.append("file", f);
      const upRes = await fetch("/api/upload", { method: "POST", body: fd });
      const upJson = await upRes.json();
      if (!upRes.ok) { alert(upJson.error || "Image upload failed"); return; }

      const { name, address, city, state, contact, email_id } = getValues();
      const payload = { name, address, city, state, contact, email_id, image: upJson.url };

      const res = await fetch("/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Add school failed:", errText);
        alert("Failed: " + errText);
        return;
      }

      alert("School added successfully!");
      reset();
      if (fileRef.current) fileRef.current.value = "";
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
        <h1 className="text-2xl font-bold text-center text-violet-700 mb-6">
          Add a New School
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School Name
            </label>
            <input
              type="text"
              {...register("name", { required: "School name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                {...register("state", { required: "State is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="number"
                {...register("contact", { required: "Contact is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email_id", { required: "Email is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School Image
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              {...register("image", { required: "Image is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white bg-violet-600 hover:bg-violet-700 transition"
          >
            {loading ? "Adding..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
}
