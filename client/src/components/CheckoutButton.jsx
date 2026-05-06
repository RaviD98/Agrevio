import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";

const CheckoutButton = ({
  singleItem = null,
  label = "Checkout All Items",
}) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getLineItems = () => {
    if (singleItem) {
      // Single item purchase, ignore cart completely
      return [
        {
          price_data: {
            currency: "inr",
            product_data: { name: singleItem.name },
            unit_amount: Math.round(singleItem.price * 100), // paise
          },
          quantity: 1,
        },
      ];
    }

    // Cart purchase - use only cart items
    return Object.values(cartItems).map(({ qty, data }) => ({
      price_data: {
        currency: "inr",
        product_data: { name: data.name },
        unit_amount: Math.round(data.price * 100),
      },
      quantity: qty,
    }));
  };

  const handleCheckout = async () => {
    const lineItems = getLineItems();
    if (lineItems.length === 0) return alert("No items to checkout");

    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/payments/checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",  
          body: JSON.stringify({ line_items: lineItems }),
        },
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server ${res.status}: ${text}`);
      }

      const { url } = await res.json();

      // tell the success page whether to clear the cart
      if (!singleItem) {
        localStorage.setItem("shouldClearCart", "true") //mark cart checkout
     }

      window.location.href = url;
    } catch (err) {
      console.error("Stripe checkout error:", err);
      alert("Unable to start checkout – see console.");
    }
  };

  // Disabled if cart empty for cart checkout, or singleItem not provided for single checkout
  const isDisabled = !singleItem && Object.keys(cartItems).length === 0;

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
