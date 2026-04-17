import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Rocket, Lightbulb, Handshake } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center transition-colors duration-300 px-6 py-16 bg-[#edf7f6] dark:bg-[#121212] w-full">
      <div className="w-full max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-700 dark:text-green-400">
          About&nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-green-400 dark:from-green-400 dark:via-green-300 dark:to-green-200">
            AgroHub
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-800 dark:text-gray-300 mb-12">
          We’re passionate creators building innovative digital experiences that
          empower the agricultural community.
        </p>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {/* Feature Card */}
          {[
            {
              icon: (
                <Leaf className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              ),
              title: "Our Mission",
              text: "Simplify technology for every farmer by delivering high‑quality, scalable, and user‑centric solutions that make a tangible difference.",
            },
            {
              icon: (
                <Rocket className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              ),
              title: "What We Do",
              text: "From full‑stack web development to mobile solutions, we bring your agri‑tech ideas to life with precision and passion.",
            },
            {
              icon: (
                <Lightbulb className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              ),
              title: "Our Vision",
              text: "To be a leading force in digital transformation, shaping a better tomorrow for agriculture through technology and innovation.",
            },
            {
              icon: (
                <Handshake className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              ),
              title: "Why Choose Us",
              text: "We value quality, transparency, and partnership. Working with us means results, reliability, and respect.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg hover:shadow-xl transition border border-green-100 dark:border-green-800"
            >
              {feature.icon}
              <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Let’s Connect
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-6 max-w-md mx-auto">
            We’d love to hear from you. Drop us a message and let’s grow
            together!
          </p>
          <Button
            onClick={() => navigate("/contact")}
            size="lg"
            className="bg-[#68d388] hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 text-white font-medium rounded-lg px-8 py-3 shadow-md"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
