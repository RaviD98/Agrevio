import React from "react";
import { Truck, Wrench, Cpu, Users } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-green-600" />,
    title: "Equipment Rental",
    description:
      "Access a wide range of modern agricultural machinery and tools for rent at affordable prices.",
  },
  {
    icon: <Wrench className="w-8 h-8 text-green-600" />,
    title: "Expert Consultancy",
    description:
      "Get professional advice and consultancy services to boost your farm productivity.",
  },
  {
    icon: <Cpu className="w-8 h-8 text-green-600" />,
    title: "Smart Crop Monitoring",
    description:
      "Leverage AI-powered crop monitoring to detect issues early and maximize yields.",
  },
  {
    icon: <Users className="w-8 h-8 text-green-600" />,
    title: "Community Support",
    description:
      "Join a vibrant community of farmers and experts sharing knowledge and support.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
        Our Key Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map(({ icon, title, description }) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-400">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
