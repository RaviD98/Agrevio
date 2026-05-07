import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

import nature from "@/assets/nature.jpg";
import nature1 from "@/assets/nature (1).jpg";
import wheat1 from "@/assets/wheat1.jpg";
import tomatoSeeds from "@/assets/tomato-seeds-img.jpeg";

import FeaturesSection from "@/components/FeaturesSection";
import ProductNavbar from "@/components/ProductNavbar";

const images = [
  { src: wheat1, alt: "wheat image" },
  { src: nature1, alt: "nature image" },
  { src: nature, alt: "nature image" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f4] dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
      <ProductNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {images.map((img, index) => (
            <img
              key={img.alt}
              src={img.src}
              alt={img.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              draggable={false}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
          <div className="mb-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
            <Leaf className="h-4 w-4 text-green-300" />
            <span className="text-sm text-white/90">
              Smart Agriculture Platform
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">
            Modern Agriculture,
            <span className="block text-green-300">Simplified Digitally</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-200 md:text-xl">
            Agrevio connects farmers, businesses, and agriculture services into
            one modern ecosystem built for speed, trust, and accessibility.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/products")}
              className="h-12 rounded-xl bg-green-600 px-6 text-base font-medium text-white hover:bg-green-700"
            >
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/products/category/seeds")}
              className="h-12 rounded-xl border-white/30 bg-white/10 px-6 text-base text-white backdrop-blur-md hover:bg-white/20"
            >
              Explore Seeds
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        {/* Image */}
        <div className="relative">
          <img
            src={tomatoSeeds}
            alt="Modern Agriculture"
            className="w-full rounded-3xl object-cover shadow-2xl"
          />

          <div className="absolute -bottom-6 left-6 rounded-2xl border border-neutral-200 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-[#222225]/90">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Trusted by modern agri-businesses
            </p>

            <h3 className="mt-1 text-xl font-semibold">
              Smart Farming Solutions
            </h3>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-600 dark:text-green-400">
            About Agrevio
          </p>

          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Bridging Agriculture with Technology
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            Agrevio helps farmers and agri-businesses access quality products,
            services, and equipment through a seamless digital experience. From
            seeds and machinery to logistics and support, everything is designed
            with simplicity and efficiency in mind.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm dark:border-neutral-800 dark:bg-[#222225]">
              <h4 className="text-2xl font-bold text-green-600">24/7</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Platform Access
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm dark:border-neutral-800 dark:bg-[#222225]">
              <h4 className="text-2xl font-bold text-green-600">Smart</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Agriculture Network
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm dark:border-neutral-800 dark:bg-[#222225]">
              <h4 className="text-2xl font-bold text-green-600">Fast</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Product Discovery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />
    </div>
  );
};

export default HomePage;