import React from "react";

import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from "@/features/api/cartApi";

import { Button } from "@/components/ui/button";
import CheckoutButton from "@/components/CheckoutButton";

const Cart = () => {
  const { data, isLoading, isError } = useGetCartQuery();

  const [removeFromCart] = useRemoveFromCartMutation();

  const [clearCart] = useClearCartMutation();

  const cartItems = data?.data?.items || [];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0,
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load cart.</p>
      </div>
    );
  }

  // Empty cart
  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#edf7f6] dark:bg-[#121212]">
        <p className="text-center text-lg font-medium text-green-700 dark:text-gray-400">
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#edf7f6] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-8 rounded-xl shadow-lg bg-white dark:bg-[#1A1A1A] border dark:border-[#2A2A2A]">
        <h2 className="text-3xl font-bold mb-8 text-green-800 dark:text-white">
          Your Shopping Cart
        </h2>

        <ul className="space-y-4 overflow-auto">
          {cartItems.map((item) => (
            <li
              key={item.product._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg
              border border-green-200 dark:border-[#2A2A2A]
              bg-white hover:bg-[#e4f9df]
              dark:bg-[#1A1A1A] dark:hover:bg-[#2A2A2A]
              transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-white">
                  {item.product.title}
                </h3>

                <p className="text-green-700 dark:text-gray-300 mt-1">
                  ₹{item.product.price} × {item.quantity}
                  <span className="font-medium dark:text-white">
                    {" "}
                    = ₹{item.product.price * item.quantity}
                  </span>
                </p>
              </div>

              <Button
                variant="destructive"
                className="mt-4 sm:mt-0"
                onClick={() => removeFromCart(item.product._id)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>

        <footer
          className="mt-8 pt-6 border-t border-green-300 dark:border-gray-700
          flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-2xl font-bold text-green-800 dark:text-white">
            Total: ₹{totalPrice}
          </p>

          <CheckoutButton
            metadata={{
              type: "order",
              resourceId: "pending",
            }}
          />

          <Button
            className="bg-[#68d388] hover:bg-green-600 text-white mt-4 sm:mt-0"
            onClick={() => clearCart()}
          >
            Clear Cart
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Cart;
