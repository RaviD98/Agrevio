import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productData } from "@/data/productData";
import { productImages } from "@/data/productImagesData";

const CategoryPage = () => {
  const { category } = useParams(); // e.g. "seeds"
  const navigate = useNavigate();

  const categoryItems = productData[category];

  if (!categoryItems) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#edf7f6] dark:bg-[#121212]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            Invalid Category
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Please select a valid product category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#edf7f6] dark:bg-[#121212]">
      <h2 className="text-3xl font-bold mb-6 capitalize text-green-700 dark:text-green-300">
        {category.replace(/-/g, " ")} Products
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categoryItems).map(([itemSlug, item]) => (
          <Card
            key={itemSlug}
            onClick={() => navigate(`/products/${category}/${itemSlug}`)}
            className="cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.015]
             bg-white dark:bg-[#1A1A1A] border border-green-100 dark:border-[#2A2A2A] rounded-2xl overflow-hidden"
          >
            {/* Image with slightly increased height */}
            {productImages[itemSlug] && (
              <div className="h-56 overflow-hidden rounded-b-none">
                <img
                  src={productImages[itemSlug]}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}

            <CardHeader className="p-4">
              <CardTitle className="text-green-800 dark:text-green-200 text-xl">
                {item.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 pb-5">
              <p className="text-gray-700 dark:text-gray-400 mb-3 text-sm">
                Click to explore more about {item.name.toLowerCase()}.
              </p>
              <button className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md">
                View Details
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
