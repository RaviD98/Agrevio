import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/features/api/productApi";

import LoadingScreen from "@/components/LoadingScreen";

const EditProduct = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductByIdQuery(productId);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "sale",

    price: "",
    stock: "",

    pricePerHour: "",
    securityDeposit: "",

    location: "",

    images: "",
  });

  // Fill form
  useEffect(() => {
    if (data?.data) {
      const product = data.data;

      setFormData({
        title: product.title || "",

        description: product.description || "",

        category: product.category || "",

        type: product.type || "sale",

        price: product.price || "",

        stock: product.stock || "",

        pricePerHour: product.pricePerHour || "",

        securityDeposit: product.securityDeposit || "",

        location: product.location || "",

        images: product.images?.join(", ") || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,

        images: formData.images.split(",").map((img) => img.trim()),
      };

      await updateProduct({
        productId,
        productData: payload,
      }).unwrap();

      toast.success("Product updated successfully");

      navigate("/vendor/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update product");
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
        <p className="text-red-500 text-lg">Failed to load product.</p>
      </div>
    );
  }

  return (
    <section
      className="
        min-h-screen
        bg-[#FBFAF5]
        px-4 py-10
        transition-colors duration-300
        dark:bg-[#2C2C2C]
        font-['Manrope']
      "
    >
      <div
        className="
          mx-auto max-w-3xl
          rounded-[2rem]
          border border-gray-200
          bg-white
          p-6 sm:p-8 md:p-10
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          dark:border-[#4A4A4A]
          dark:bg-[#3A3A3A]
        "
      >
        {/* Header */}
        <div className="mb-10">
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
            Edit Product
          </h1>

          <p
            className="
              mt-4 text-base
              leading-relaxed
              text-gray-600
              dark:text-gray-300
            "
          >
            Update your agricultural product details and keep your listings
            accurate for customers.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="
                w-full rounded-2xl
                border border-gray-200
                bg-[#FBFAF5]
                px-4 py-3
                text-sm
                outline-none transition-all duration-300
                focus:border-[#007200]
                focus:ring-4 focus:ring-[#007200]/10
                dark:border-[#4A4A4A]
                dark:bg-[#2C2C2C]
                dark:text-white
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="
                w-full resize-none rounded-2xl
                border border-gray-200
                bg-[#FBFAF5]
                px-4 py-3
                text-sm
                outline-none transition-all duration-300
                focus:border-[#007200]
                focus:ring-4 focus:ring-[#007200]/10
                dark:border-[#4A4A4A]
                dark:bg-[#2C2C2C]
                dark:text-white
              "
            />
          </div>

          {/* Category + Type */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="
                  w-full cursor-pointer rounded-2xl
                  border border-gray-200
                  bg-[#FBFAF5]
                  px-4 py-3
                  text-sm
                  outline-none transition-all duration-300
                  focus:border-[#007200]
                  focus:ring-4 focus:ring-[#007200]/10
                  dark:border-[#4A4A4A]
                  dark:bg-[#2C2C2C]
                  dark:text-white
                "
              >
                <option value="">Select Category</option>

                <option value="seeds">Seeds</option>

                <option value="irrigation">Irrigation</option>

                <option value="machinery">Machinery</option>

                <option value="tools">Tools</option>

                <option value="fertilizers">Fertilizers</option>

                <option value="pesticides">Pesticides</option>

                <option value="greenhouse">Greenhouse</option>

                <option value="feed">Animal Feed</option>

                <option value="storage">Storage</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Product Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="
                  w-full cursor-pointer rounded-2xl
                  border border-gray-200
                  bg-[#FBFAF5]
                  px-4 py-3
                  text-sm
                  outline-none transition-all duration-300
                  focus:border-[#007200]
                  focus:ring-4 focus:ring-[#007200]/10
                  dark:border-[#4A4A4A]
                  dark:bg-[#2C2C2C]
                  dark:text-white
                "
              >
                <option value="sale">Sale</option>

                <option value="rent">Rent</option>

                <option value="both">Both</option>
              </select>
            </div>
          </div>

          {/* Sale Fields */}
          {(formData.type === "sale" || formData.type === "both") && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="
                    w-full rounded-2xl
                    border border-gray-200
                    bg-[#FBFAF5]
                    px-4 py-3
                    text-sm
                    outline-none transition-all duration-300
                    focus:border-[#007200]
                    focus:ring-4 focus:ring-[#007200]/10
                    dark:border-[#4A4A4A]
                    dark:bg-[#2C2C2C]
                    dark:text-white
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="
                    w-full rounded-2xl
                    border border-gray-200
                    bg-[#FBFAF5]
                    px-4 py-3
                    text-sm
                    outline-none transition-all duration-300
                    focus:border-[#007200]
                    focus:ring-4 focus:ring-[#007200]/10
                    dark:border-[#4A4A4A]
                    dark:bg-[#2C2C2C]
                    dark:text-white
                  "
                />
              </div>
            </div>
          )}

          {/* Rent Fields */}
          {(formData.type === "rent" || formData.type === "both") && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Price Per Hour
                </label>

                <input
                  type="number"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  className="
                    w-full rounded-2xl
                    border border-gray-200
                    bg-[#FBFAF5]
                    px-4 py-3
                    text-sm
                    outline-none transition-all duration-300
                    focus:border-[#007200]
                    focus:ring-4 focus:ring-[#007200]/10
                    dark:border-[#4A4A4A]
                    dark:bg-[#2C2C2C]
                    dark:text-white
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Security Deposit
                </label>

                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  className="
                    w-full rounded-2xl
                    border border-gray-200
                    bg-[#FBFAF5]
                    px-4 py-3
                    text-sm
                    outline-none transition-all duration-300
                    focus:border-[#007200]
                    focus:ring-4 focus:ring-[#007200]/10
                    dark:border-[#4A4A4A]
                    dark:bg-[#2C2C2C]
                    dark:text-white
                  "
                />
              </div>
            </div>
          )}

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="
                w-full rounded-2xl
                border border-gray-200
                bg-[#FBFAF5]
                px-4 py-3
                text-sm
                outline-none transition-all duration-300
                focus:border-[#007200]
                focus:ring-4 focus:ring-[#007200]/10
                dark:border-[#4A4A4A]
                dark:bg-[#2C2C2C]
                dark:text-white
              "
            />
          </div>

          {/* Images */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Image URLs
            </label>

            <input
              type="text"
              name="images"
              placeholder="Comma separated image URLs"
              value={formData.images}
              onChange={handleChange}
              className="
                w-full rounded-2xl
                border border-gray-200
                bg-[#FBFAF5]
                px-4 py-3
                text-sm
                outline-none transition-all duration-300
                placeholder:text-gray-400
                focus:border-[#007200]
                focus:ring-4 focus:ring-[#007200]/10
                dark:border-[#4A4A4A]
                dark:bg-[#2C2C2C]
                dark:text-white
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isUpdating}
            className="
              w-full cursor-pointer
              rounded-2xl
              bg-[#007200]
              py-3.5
              text-sm font-semibold text-white
              transition-all duration-300
              hover:bg-[#04471c]
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
