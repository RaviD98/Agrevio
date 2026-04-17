import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ProductItemCard = ({ name, image, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-transform hover:scale-105 hover:shadow-xl rounded-2xl overflow-hidden bg-[#edf7f6] dark:bg-[#121212] border border-green-200/30 dark:border-green-800/30"
    >
      <img
        src={image}
        alt={name}
        className="h-48 w-full object-cover transition duration-300"
      />
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">
          {name}
        </h3>
      </CardContent>
    </Card>
  );
};

export default ProductItemCard;
