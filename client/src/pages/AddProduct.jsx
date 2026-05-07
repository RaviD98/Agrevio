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

      navigate("/vendor/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

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
        {/* Heading */}
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
            Add Product
          </h1>

          <p
            className="
              mt-4 text-base
              leading-relaxed
              text-gray-600
              dark:text-gray-300
            "
          >
            Add your agricultural products with complete details for customers
            to explore and purchase.
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

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Security Deposit
                </label>

                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
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

          {/* Images */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Image URLs
            </label>

            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              placeholder="Comma separated image URLs"
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
            disabled={isLoading}
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
            {isLoading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
