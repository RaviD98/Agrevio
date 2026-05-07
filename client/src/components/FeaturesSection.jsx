import React from "react";
import { Truck, Wrench, Cpu, Users } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-7 h-7 text-[#007200]" />,
    title: "Equipment Rental",
    description:
      "Access modern agricultural machinery and tools at affordable rental prices.",
  },
  {
    icon: <Wrench className="w-7 h-7 text-[#007200]" />,
    title: "Expert Consultancy",
    description:
      "Get professional guidance and consultancy to improve farm productivity.",
  },
  {
    icon: <Cpu className="w-7 h-7 text-[#007200]" />,
    title: "Smart Crop Monitoring",
    description:
      "Use intelligent monitoring systems to identify crop issues early and maximize yield.",
  },
  {
    icon: <Users className="w-7 h-7 text-[#007200]" />,
    title: "Community Support",
    description:
      "Connect with farmers and experts through a trusted agricultural network.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      className="
        w-full px-4 sm:px-6 py-20
        bg-[#FBFAF5]
        dark:bg-[#2C2C2C]
        transition-colors duration-300
        font-['Inter']
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p
            className="
              text-sm uppercase tracking-[0.2em]
              text-[#007200]
              font-semibold mb-4
            "
          >
            Features
          </p>

          <h2
            className="
              text-4xl md:text-5xl
              font-bold leading-tight
              text-[#007200]
              dark:text-green-300
              font-['Arvo']
            "
          >
            Built for Modern Agriculture
          </h2>

          <p
            className="
              mt-5 text-base md:text-lg
              leading-relaxed
              text-gray-600 dark:text-gray-300
            "
          >
            AgroHub simplifies agricultural operations with technology-driven
            solutions designed for efficiency, accessibility, and growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="
                group rounded-3xl
                border border-gray-200
                bg-white p-7
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[#007200]/20
                dark:border-[#3A3A3A]
                dark:bg-[#3A3A3A]
              "
            >
              {/* Icon */}
              <div
                className="
                  mb-6 flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-[#007200]/10
                  transition-all duration-300
                  group-hover:bg-[#007200]/15
                "
              >
                {icon}
              </div>

              {/* Title */}
              <h3
                className="
                  mb-3 text-2xl
                  font-bold
                  text-[#007200]
                  dark:text-green-300
                  font-['Arvo']
                "
              >
                {title}
              </h3>

              {/* Description */}
              <p
                className="
                  text-sm leading-relaxed
                  text-gray-600 dark:text-gray-300
                "
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
