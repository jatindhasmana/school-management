"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          School Management Portal
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Add new schools or explore the list of existing ones.
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/addSchool"
            className="group bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all flex flex-col items-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              alt="Add School"
              className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300"
            />
            <h2 className="text-xl font-semibold text-gray-800">Add School</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Enter and save details of a new school.
            </p>
          </Link>

          <Link
            href="/showSchools"
            className="group bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all flex flex-col items-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
              alt="Show Schools"
              className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300"
            />
            <h2 className="text-xl font-semibold text-gray-800">Show Schools</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Browse through the list of added schools.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
