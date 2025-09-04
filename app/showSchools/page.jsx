"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/schools", { cache: "no-store" });
        const data = await res.json();
        setSchools(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading schools…</p>;
  if (!schools.length) return <p className="p-6 text-center">No schools found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
        Schools
      </h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {schools.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition p-4"
          >
            <Image
              src={s.image || "/schoolImages/default.jpg"}
              alt={s.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-xl mb-4 transition-transform duration-300 hover:scale-105"
            />
            <h2 className="text-xl font-semibold text-gray-800">{s.name}</h2>
            <p className="text-gray-600">{s.address}</p>
            <p className="text-gray-500">{s.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
