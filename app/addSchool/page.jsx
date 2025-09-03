"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("School added successfully!");
        reset();
      } else {
        alert("Failed to add school");
      }
    } catch (error) {
      console.error("Error adding school:", error);
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="School Name"
            {...register("name", { required: "School name is required" })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="State"
              {...register("state", { required: "State is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Contact Number"
              {...register("contact", { required: "Contact is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email Address"
              {...register("email_id", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white bg-violet-600 hover:bg-violet-700"
          >
            {loading ? "Adding..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
}
