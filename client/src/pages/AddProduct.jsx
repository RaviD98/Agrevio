import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { useCreateProductMutation } from "@/features/api/productApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [createProduct, { isLoading }] = useCreateProductMutation();

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

      // Clean irrelevant fields
      if (formData.type === "sale") {
        delete payload.pricePerHour;
        delete payload.securityDeposit;
      }

      if (formData.type === "rent") {
        delete payload.price;
        delete payload.stock;
      }

      await createProduct(payload).unwrap();

      toast.success("Product created successfully");

      navigate("/products");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="min-h-screen bg-[#edf7f6] dark:bg-[#121212] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-300">
          Add Product
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

          {/* Sale fields */}
          {(formData.type === "sale" || formData.type === "both") && (
            <>
              <div>
                <label className="block mb-2 font-medium">Price</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border dark:bg-[#121212]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Stock</label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border dark:bg-[#121212]"
                />
              </div>
            </>
          )}

          {/* Rent fields */}
          {(formData.type === "rent" || formData.type === "both") && (
            <>
              <div>
                <label className="block mb-2 font-medium">Price Per Hour</label>

                <input
                  type="number"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border dark:bg-[#121212]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Security Deposit
                </label>

                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border dark:bg-[#121212]"
                />
              </div>
            </>
          )}

          {/* Location */}
          <div>
            <label className="block mb-2 font-medium">Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border dark:bg-[#121212]"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block mb-2 font-medium">Image URLs</label>

            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              placeholder="Comma separated URLs"
              className="w-full p-3 rounded-lg border dark:bg-[#121212]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
