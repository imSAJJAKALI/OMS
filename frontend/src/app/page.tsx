'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";

export default function Home() {
  const store = useSelector((store)=>store);

  console.log(store)
  return (
    <div className="bg-red-200 text-8xl text-gray-700">
      <Navbar/>
      <h3>Home Content</h3>
      <Footer/>
    </div>
  );
}
