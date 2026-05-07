import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutButton from "@/components/CheckoutButton";
import { Button } from "@/components/ui/button";

const Payment = () => {
  const { state } = useLocation();
  const product = state?.product;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#edf7f6] dark:bg-[#121212] text-red-600">
        <p className="text-lg font-semibold">No item selected for purchase.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-[#edf7f6] dark:bg-[#121212] text-green-900 dark:text-green-200 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-300">
        Payment Summary
      </h2>

      <div className="w-full max-w-xl bg-white dark:bg-green-950 p-6 rounded-xl shadow-lg border border-green-200/30 dark:border-green-800/30">
        <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 dark:text-gray-300">
          {product.description}
        </p>
        <p className="mt-4 text-xl font-bold text-green-700 dark:text-green-300">
          ₹{product.price}
        </p>

        <div className="mt-6">
          <CheckoutButton
            singleItem={product} // pass entire item object here
            label="Buy Now"
          />
        </div>
      </div>

      <Button
        onClick={() => window.history.back()}
        variant="outline"
        className="mt-8 border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800"
      >
        Go Back
      </Button>
    </div>
  );
};

export default Payment;
