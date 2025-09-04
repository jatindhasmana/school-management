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
          {/* Floating Label Input */}
          {[
            { id: "name", label: "School Name", type: "text", required: "School name is required" },
            { id: "address", label: "Address", type: "text", required: "Address is required" },
            { id: "city", label: "City", type: "text", required: "City is required" },
            { id: "state", label: "State", type: "text", required: "State is required" },
            { id: "contact", label: "Contact Number", type: "number", required: "Contact is required" },
            { id: "email_id", label: "Email Address", type: "email", required: "Email is required" },
          ].map((field) => (
            <div key={field.id} className="relative">
              <input
                type={field.type}
                id={field.id}
                {...register(field.id, { required: field.required })}
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-violet-500 placeholder-transparent"
              />
              <label
                htmlFor={field.id}
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-violet-600"
              >
                {field.label}
              </label>
              {errors[field.id] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.id].message}</p>
              )}
            </div>
          ))}

          {/* File Input (floating label not ideal, keep simple) */}
          <div className="relative">
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
