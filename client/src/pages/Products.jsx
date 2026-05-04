import React from "react";
import ProductCard from "@/components/ProductCard";
import {
  Leaf,
  Droplet,
  Hammer,
  Wrench,
  Bug,
  Home,
  Coffee,
  Archive,
} from "lucide-react";

const categories = [
  {
    title: "Quality Seeds",
    description: "Explore seeds like wheat, soya, paddy & more.",
    path: "/products/seeds",
    icon: Leaf,
  },
  {
    title: "Irrigation Systems",
    description: "Drip, sprinklers, pipes & accessories.",
    path: "/products/irrigation",
    icon: Droplet,
  },
  {
    title: "Farm Machinery",
    description: "Tractors, tillers, and harvesters.",
    path: "/products/machinery",
    icon: Hammer,
  },
  {
    title: "Farm Tools",
    description: "Hand tools and equipment for efficient farming.",
    path: "/products/tools",
    icon: Wrench,
  },
  {
    title: "Fertilizers & Soil",
    description: "Organic and chemical fertilizers.",
    path: "/products/fertilizers",
    icon: Leaf,
  },
  {
    title: "Pesticides & Herbicides",
    description: "Protect your crops from pests and weeds.",
    path: "/products/pesticides",
    icon: Bug,
  },
  {
    title: "Greenhouse Supplies",
    description: "Sheets, nets, ventilation & climate control.",
    path: "/products/greenhouse",
    icon: Home,
  },
  {
    title: "Animal Feed",
    description: "Nutritious feed for livestock.",
    path: "/products/feed",
    icon: Coffee,
  },
  {
    title: "Storage Solutions",
    description: "Silos, crates, bins and bags.",
    path: "/products/storage",
    icon: Archive,
  },
];

const Products = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <ProductCard key={category.path} {...category} />
        ))}
      </div>
    </div>
  );
};

export default Products;
