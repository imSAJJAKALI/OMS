"use client"

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Home() {
  // const store = useSelector((store)=>store);

  return (
    <>
      <Navbar/>
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          🛒 Welcome to ShopZone
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your one-stop destination for the latest fashion, gadgets, and more.
        </p>
        <Link
          href="/all-products"
          className="inline-block px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-full shadow-md hover:bg-indigo-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    </main>
      <Footer/>
    </>
  );
}
