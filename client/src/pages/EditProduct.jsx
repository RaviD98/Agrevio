import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/features/api/productApi";

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
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load product.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf7f6] dark:bg-[#121212] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-300">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border dark:bg-[#121212]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg border dark:bg-[#121212]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border dark:bg-[#121212]"
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
            <label className="block mb-2 font-medium">Type</label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border dark:bg-[#121212]"
            >
              <option value="sale">Sale</option>

              <option value="rent">Rent</option>

              <option value="both">Both</option>
            </select>
          </div>

          {/* Sale */}
          {(formData.type === "sale" || formData.type === "both") && (
            <>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border dark:bg-[#121212]"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border dark:bg-[#121212]"
              />
            </>
          )}

          {/* Rent */}
          {(formData.type === "rent" || formData.type === "both") && (
            <>
              <input
                type="number"
                name="pricePerHour"
                placeholder="Price Per Hour"
                value={formData.pricePerHour}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border dark:bg-[#121212]"
              />

              <input
                type="number"
                name="securityDeposit"
                placeholder="Security Deposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border dark:bg-[#121212]"
              />
            </>
          )}

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border dark:bg-[#121212]"
          />

          {/* Images */}
          <input
            type="text"
            name="images"
            placeholder="Comma separated image URLs"
            value={formData.images}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border dark:bg-[#121212]"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
