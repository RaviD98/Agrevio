import React from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import {
  useGetMyProductsQuery,
  useDeleteProductMutation,
} from "@/features/api/productApi";

import LoadingScreen from "@/components/LoadingScreen";

import FallbackImage from "@/components/FallbackImage";

import EmptyState from "@/components/EmptyState";

import { Package } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <LoadingScreen />
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <p className="text-red-500 text-lg">Failed to load dashboard.</p>
      </div>
    );
  }

  return (
    <section
      className="
        min-h-screen
        bg-[#FBFAF5]
        px-4 py-8 md:px-6
        transition-colors duration-300
        dark:bg-[#2C2C2C]
        font-['Manrope']
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          className="
            mb-10 flex flex-col gap-5
            md:flex-row md:items-center md:justify-between
          "
        >
          <div>
            <p
              className="
                mb-3 text-sm
                font-semibold uppercase tracking-[0.2em]
                text-[#007200]
              "
            >
              Vendor Panel
            </p>

            <h1
              className="
                text-4xl md:text-5xl
                font-bold
                text-[#007200]
                dark:text-green-300
                font-['Arvo']
              "
            >
              Vendor Dashboard
            </h1>

            <p
              className="
                mt-4 text-base
                text-gray-600
                dark:text-gray-300
              "
            >
              Manage your agricultural products and listings.
            </p>
          </div>

          {/* Add Product */}
          <button
            onClick={() => navigate("/add-product")}
            className="
              cursor-pointer
              rounded-2xl
              bg-[#007200]
              px-6 py-3
              text-sm font-semibold text-white
              transition-all duration-300
              hover:bg-[#04471c]
            "
          >
            + Add Product
          </button>
        </div>

        {/* Empty */}
        {!products.length ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <EmptyState
              icon={<Package className="h-20 w-20" />}
              title="No products found"
              description="Start by adding your first product."
            />
          </div>
        ) : (
          <div
            className="
              grid gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="
                  overflow-hidden
                  rounded-[1.8rem]
                  border border-gray-200
                  bg-white
                  shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                  transition-all duration-300
                  hover:-translate-y-1
                  dark:border-[#4A4A4A]
                  dark:bg-[#3A3A3A]
                "
              >
                {/* Image */}
                <div
                  className="
                    flex h-56 items-center justify-center
                    bg-[#FBFAF5]
                    p-4
                    dark:bg-[#2C2C2C]
                  "
                >
                  <FallbackImage
                    src={product.images?.[0]}
                    alt={product.title}
                    className="
                      h-full w-full
                      object-contain
                    "
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h2
                    className="
                      line-clamp-1
                      text-2xl font-bold
                      text-[#1F2937]
                      dark:text-white
                      font-['Arvo']
                    "
                  >
                    {product.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="
                      mt-3 line-clamp-2
                      text-sm leading-relaxed
                      text-gray-600
                      dark:text-gray-300
                    "
                  >
                    {product.description}
                  </p>

                  {/* Details */}
                  <div className="mt-4 space-y-2">
                    <p
                      className="
                        text-sm
                        text-gray-600
                        dark:text-gray-300
                      "
                    >
                      <span className="font-semibold">Category:</span>{" "}
                      <span className="capitalize">{product.category}</span>
                    </p>

                    <p
                      className="
                        text-sm
                        text-gray-600
                        dark:text-gray-300
                      "
                    >
                      <span className="font-semibold">Type:</span>{" "}
                      <span className="capitalize">{product.type}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => navigate(`/products/edit/${product._id}`)}
                      className="
                        flex-1 cursor-pointer
                        rounded-2xl
                        bg-[#007200]
                        px-4 py-2.5
                        text-sm font-semibold text-white
                        transition-all duration-300
                        hover:bg-[#04471c]
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="
                        flex-1 cursor-pointer
                        rounded-2xl
                        border border-red-300
                        px-4 py-2.5
                        text-sm font-semibold
                        text-red-500
                        transition-all duration-300
                        hover:bg-red-50
                        dark:border-red-500/40
                        dark:hover:bg-red-500/10
                      "
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
    </section>
  );
};

export default VendorDashboard;
