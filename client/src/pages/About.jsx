import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Rocket, Lightbulb, Handshake } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        min-h-screen w-full
        bg-[#FBFAF5] dark:bg-[#2C2C2C]
        transition-colors duration-300
        px-4 sm:px-6 py-16
        text-[#1f2937] dark:text-[#F5F5F5]
        font-['Inter']
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p
            className="
              text-sm uppercase tracking-[0.2em]
              text-[#007200] mb-4 font-semibold
            "
          >
            About Us
          </p>

          <h1
            className="
              text-4xl sm:text-5xl md:text-6xl
              leading-tight font-bold
              text-[#007200]
              dark:text-green-300
              font-['Arvo']
            "
          >
            Building Smarter Agriculture
          </h1>

          <p
            className="
              mt-6 text-base sm:text-lg
              leading-relaxed
              text-gray-600 dark:text-gray-300
            "
          >
            AgroHub is focused on simplifying agricultural services through
            technology. We create digital solutions that help farmers,
            businesses, and agricultural communities work smarter and grow
            faster.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: <Leaf className="w-7 h-7 text-[#007200]" />,
              title: "Our Mission",
              text: "Deliver practical and scalable technology solutions that improve accessibility and efficiency in agriculture.",
            },
            {
              icon: <Rocket className="w-7 h-7 text-[#007200]" />,
              title: "What We Do",
              text: "We build modern platforms that connect farmers, sellers, and agricultural services in one ecosystem.",
            },
            {
              icon: <Lightbulb className="w-7 h-7 text-[#007200]" />,
              title: "Our Vision",
              text: "To modernize agriculture with digital innovation while keeping technology simple and accessible.",
            },
            {
              icon: <Handshake className="w-7 h-7 text-[#007200]" />,
              title: "Why Choose Us",
              text: "We value reliability, transparency, and long-term impact through clean and meaningful solutions.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="
                rounded-3xl border border-gray-200
                bg-white p-7
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[#007200]/20
                dark:border-[#3A3A3A]
                dark:bg-[#3A3A3A]
              "
            >
              <div
                className="
                  mb-5 flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-[#007200]/10
                "
              >
                {feature.icon}
              </div>

              <h2
                className="
                  mb-3 text-2xl font-bold
                  text-[#007200]
                  dark:text-green-300
                  font-['Arvo']
                "
              >
                {feature.title}
              </h2>

              <p
                className="
                  text-sm leading-relaxed
                  text-gray-600 dark:text-gray-300
                "
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="
            mt-20 rounded-[2rem]
            border border-gray-200
            bg-white px-6 py-12
            text-center
            dark:border-[#3A3A3A]
            dark:bg-[#3A3A3A]
          "
        >
          <h3
            className="
              text-3xl md:text-4xl
              font-bold mb-4
              text-[#007200]
              dark:text-green-300
              font-['Arvo']
            "
          >
            Let’s Grow Together
          </h3>

          <p
            className="
              max-w-2xl mx-auto
              text-gray-600 dark:text-gray-300
              leading-relaxed mb-8
            "
          >
            Whether you’re a farmer, supplier, or agri-business, AgroHub is here
            to help you connect, grow, and succeed through technology.
          </p>

          <Button
            onClick={() => navigate("/contact")}
            size="lg"
            className="
              rounded-2xl
              bg-[#007200]
              px-8 py-6
              text-base font-medium text-white
              transition-all duration-300
              hover:bg-[#04471c]
            "
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
