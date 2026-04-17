import React from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { category, productId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600">
        Product Page for ID: {productId} in {category}
      </h1>
    </div>
  );
};

export default ProductDetailPage;
