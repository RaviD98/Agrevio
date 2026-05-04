import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import nature from "@/assets/nature.jpg";
import nature1 from "@/assets/nature (1).jpg";
import wheat1 from "@/assets/wheat1.jpg";

import FeaturesSection from "@/components/FeaturesSection";
import ProductNavbar from "@/components/ProductNavbar";
import { useNavigate } from "react-router-dom";
import tomatoSeeds from "@/assets/tomato-seeds-img.jpeg"; // 🌾 NEW

const images = [
  { src: wheat1, alt: "wheat image" },
  { src: nature1, alt: "nature image" },
  { src: nature, alt: "natures image" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#edf7f6] dark:bg-[#121212] text-green-900 dark:text-white transition-colors duration-500">
      <ProductNavbar />

      {/* Carousel */}
      <section className="relative mx-auto w-full min-h-[45vh] overflow-hidden rounded-xl shadow-xl my-10 max-w-6xl">
        {images.map((img, index) => (
          <img
            key={img.alt}
            src={img.src}
            alt={img.alt}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            loading="lazy"
            draggable={false}
          />
        ))}
      </section>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-16 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4 text-green-600 dark:text-green-300">
          <Leaf className="w-8 h-8 animate-spin-slow" />
          <h1 className="text-5xl font-extrabold tracking-tight">AgroHub</h1>
        </div>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          A smart and simple way to access everything agricultural — from
          equipment to services — built with love for farmers and
          agri-businesses.
        </p>
        <Button
          onClick={() => navigate("/products")}
          className="px-6 py-3 rounded-md text-white font-semibold shadow-lg transition-all"
          style={{
            backgroundColor: "#68d388",
          }}
        >
          Explore Now
        </Button>
      </section>

      {/* 🖼️ Image + Tech-Agriculture Advantage Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center gap-8">
        <img
          src={tomatoSeeds}
          alt="Modern Agriculture"
          className="rounded-xl shadow-lg w-full md:w-3/4 object-cover"
        />

        {/* 🌱 Explore Seeds Button BELOW the image */}
        <Button
          onClick={() => navigate("/products/seeds")}
          className="px-6 py-3 rounded-md text-white font-semibold shadow-md transition-all"
          style={{
            backgroundColor: "#4CAF50", // A greenish shade
          }}
        >
          Explore Seeds
        </Button>

        <div className="md:w-3/4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-700 dark:text-green-300">
            Empowering Agriculture with Technology
          </h2>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
            AgroHub bridges the gap between traditional farming and modern
            solutions. Our platform connects farmers, sellers, and service
            providers through intelligent tools and digital infrastructure.
            Whether you're buying quality seeds, renting equipment, or tracking
            orders — AgroHub empowers you with simplicity, speed, and trust.
          </p>
        </div>
      </section>

      <FeaturesSection />

      {/* Dark mode background override */}
      <style jsx="true">{`
        html.dark .min-h-screen {
          background-color: #121212;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
