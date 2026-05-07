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

      {/* Stats Strip */}
      <section className="border-y border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#222225]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              value: "500+",
              label: "Agricultural Products",
            },
            {
              value: "24/7",
              label: "Marketplace Access",
            },
            {
              value: "Smart",
              label: "Digital Agriculture",
            },
            {
              value: "Fast",
              label: "Equipment Discovery",
            },
          ].map((item) => (
            <div key={item.label}>
              <h3 className="text-4xl font-bold text-[#007200] font-['Arvo']">
                {item.value}
              </h3>

              <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#FBFAF5] py-24 dark:bg-[#2C2C2C]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={tomatoSeeds}
              alt="Modern Agriculture"
              className="
          w-full rounded-[2rem]
          object-cover shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        "
            />

            <div
              className="
          absolute -bottom-5 left-5
          rounded-2xl border border-neutral-200
          bg-white px-5 py-4 shadow-lg
          dark:border-neutral-700
          dark:bg-[#3A3A3A]
        "
            >
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Trusted by modern agri-businesses
              </p>

              <h3 className="mt-1 text-lg font-bold font-['Arvo']">
                Smart Farming Solutions
              </h3>
            </div>
          </div>

          {/* Content */}
          <div>
            <p
              className="
          mb-3 text-sm font-semibold uppercase
          tracking-[0.2em] text-[#007200]
        "
            >
              About Agrevio
            </p>

            <h2
              className="
          text-4xl font-bold leading-tight
          text-neutral-900
          dark:text-white
          md:text-5xl
          font-['Arvo']
        "
            >
              Bridging Agriculture with Technology
            </h2>

            <p
              className="
          mt-6 text-lg leading-relaxed
          text-neutral-600
          dark:text-neutral-300
        "
            >
              Agrevio helps farmers and agri-businesses access quality products,
              services, and equipment through a seamless digital experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {[
                {
                  title: "24/7",
                  desc: "Platform Access",
                },
                {
                  title: "Smart",
                  desc: "Agriculture Network",
                },
                {
                  title: "Fast",
                  desc: "Product Discovery",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
              rounded-2xl border border-neutral-200
              bg-white px-5 py-4 shadow-sm
              dark:border-neutral-700
              dark:bg-[#3A3A3A]
            "
                >
                  <h4
                    className="
                text-2xl font-bold
                text-[#007200]
                font-['Arvo']
              "
                  >
                    {item.title}
                  </h4>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="bg-[#FBFAF5] py-24 dark:bg-[#2C2C2C]">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="
        flex flex-col gap-6
        md:flex-row md:items-end md:justify-between
      "
          >
            <div>
              <p
                className="
            mb-3 text-sm font-semibold uppercase
            tracking-[0.2em] text-[#007200]
          "
              >
                Marketplace Categories
              </p>

              <h2
                className="
            text-4xl font-bold
            text-neutral-900
            dark:text-white
            font-['Arvo']
          "
              >
                Everything agriculture needs
              </h2>
            </div>

            <Button
              onClick={() => navigate("/products")}
              className="
          rounded-xl bg-[#007200]
          hover:bg-[#04471c]
          cursor-pointer
        "
            >
              Explore Marketplace
            </Button>
          </div>

          <div
            className="
        mt-12 grid gap-6
        sm:grid-cols-2
        lg:grid-cols-4
      "
          >
            {["Seeds", "Machinery", "Irrigation", "Fertilizers"].map((item) => (
              <div
                key={item}
                className="
            rounded-[2rem]
            border border-neutral-200
            bg-white p-6
            shadow-sm
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-lg
            dark:border-neutral-700
            dark:bg-[#3A3A3A]
            cursor-pointer
          "
              >
                <h3
                  className="
              text-2xl font-bold
              text-neutral-900
              dark:text-white
              font-['Arvo']
            "
                >
                  {item}
                </h3>

                <p
                  className="
              mt-4 leading-relaxed
              text-neutral-500
              dark:text-neutral-400
            "
                >
                  Discover trusted agricultural products and modern farming
                  solutions.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* How It Works */}
      <section className="py-24 dark:bg-[#2C2C2C] bg-[#FBFAF5]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#007200]">
              Simple Process
            </p>

            <h2 className="text-4xl font-bold font-['Arvo']">
              How Agrevio Works
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Explore Products",
                text: "Browse agricultural products and services from verified vendors.",
              },
              {
                step: "02",
                title: "Connect & Purchase",
                text: "Rent machinery or purchase products seamlessly online.",
              },
              {
                step: "03",
                title: "Grow Efficiently",
                text: "Use modern agricultural solutions to improve productivity.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="
            rounded-3xl border border-neutral-200
            bg-[#f7f7f4] p-8
            dark:border-neutral-800 dark:bg-[#18181b]
          "
              >
                <span className="text-5xl font-bold text-[#007200] font-['Arvo']">
                  {item.step}
                </span>

                <h3 className="mt-6 text-2xl font-bold font-['Arvo']">
                  {item.title}
                </h3>

                <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 dark:bg-[#2C2C2C] bg-[#FBFAF5]">
        <div
          className="
      mx-auto max-w-7xl overflow-hidden
      rounded-[2.5rem]
      bg-[#007200]
      px-8 py-16 text-white
      md:px-16
      
    "
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-green-200">
              Join Agrevio
            </p>

            <h2 className="text-4xl font-bold leading-tight font-['Arvo'] md:text-5xl">
              Modernize your agricultural journey today.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-green-100">
              Discover products, connect with vendors, and experience a smarter
              agriculture marketplace designed for the future.
            </p>

            <Button
              onClick={() => navigate("/products")}
              className="
          mt-10 rounded-xl
          bg-white text-[#007200]
          hover:bg-neutral-100
        "
            >
              Start Exploring
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;