import React from "react";

import { Button } from "@/components/ui/button";

import { useGetCartQuery } from "@/features/api/cartApi";

import { BASE_URL } from "@/constants/api";

const CheckoutButton = ({
  singleItem = null,

  label = "Checkout All Items",

  metadata = {},
}) => {
  const { data } = useGetCartQuery();

  const cartItems = data?.data?.items || [];

  const getLineItems = () => {
    // Single item
    if (singleItem) {
      return [
        {
          price_data: {
            currency: "inr",

            product_data: {
              name: singleItem.title,
            },

            unit_amount: Math.round(singleItem.price * 100),
          },

          quantity: 1,
        },
      ];
    }

    // Cart
    return cartItems.map((item) => ({
      price_data: {
        currency: "inr",

        product_data: {
          name: item.product.title,
        },

        unit_amount: Math.round(item.product.price * 100),
      },

      quantity: item.quantity,
    }));
  };

  const handleCheckout = async () => {
    const lineItems = getLineItems();

    if (lineItems.length === 0) {
      return alert("No items to checkout");
    }

    try {
      const res = await fetch(
        `${BASE_URL}/payments/checkout-session`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            line_items: lineItems,

            metadata,
          }),
        },
      );

      if (!res.ok) {
        const text = await res.text();

        throw new Error(`Server ${res.status}: ${text}`);
      }

      const result = await res.json();

      window.location.href = result.data.url;
    } catch (err) {
      console.error("Stripe checkout error:", err);

      alert("Unable to start checkout");
    }
  };

  const isDisabled = !singleItem && cartItems.length === 0;

  return (
    <Button
      onClick={handleCheckout}
      disabled={isDisabled}
      className="bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
    >
      {label}
    </Button>
  );
};

export default CheckoutButton;
