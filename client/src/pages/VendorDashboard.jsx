import React from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import {
  useGetMyProductsQuery,
  useDeleteProductMutation,
} from "@/features/api/productApi";
import LoadingScreen from "@/components/LoadingScreen";

const VendorDashboard = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetMyProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.data || [];

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingScreen/>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf7f6] dark:bg-[#121212] p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">
          Vendor Dashboard
        </h1>

        <button
          onClick={() => navigate("/add-product")}
          className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-xl shadow cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      {/* Empty */}
      {!products.length ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            No products found
          </h2>

          <p className="mt-2 text-gray-500">
            Start by adding your first product.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-lg border dark:border-[#2A2A2A]"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <img
                  src={product.images?.[0] || "https://placehold.co/600x400"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">
                  {product.title}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {product.description}
                </p>

                <p className="font-medium mb-2">Category: {product.category}</p>

                <p className="font-medium mb-4">Type: {product.type}</p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/products/edit/${product._id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
