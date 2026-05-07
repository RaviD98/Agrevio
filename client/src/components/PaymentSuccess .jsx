import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useCreateOrderMutation } from "@/features/api/orderApi";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    const createUserOrder = async () => {
      try {
        const shouldCreateOrder =
          localStorage.getItem("shouldCreateOrder") === "true";

        if (shouldCreateOrder) {
          await createOrder().unwrap();

          localStorage.removeItem("shouldCreateOrder");

          toast.success("Order created successfully");
        }
      } catch (error) {
        console.error(error);

        toast.error(error?.data?.message || "Failed to create order");
      }
    };

    createUserOrder();
  }, [createOrder]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full bg-green-50 dark:bg-gray-900 px-6 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 dark:text-green-400 mb-6 select-none">
        Payment successful{" "}
        <span
          aria-label="celebration"
          role="img"
          className="inline-block animate-pulse"
        >
          🎉
        </span>
      </h1>

      <p className="text-lg md:text-xl text-green-900 dark:text-green-200 mb-12 max-w-lg mx-auto leading-relaxed">
        Thank you for your purchase! Your order has been confirmed and is being
        processed.
      </p>

      <div className="flex gap-6">
        <Button
          onClick={() => navigate("/")}
          className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white px-10 py-3 rounded-lg shadow-lg"
        >
          Return to Home
        </Button>

        <Button
          onClick={() => navigate("/orders")}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-10 py-3 rounded-lg shadow-lg"
        >
          View Orders
        </Button>
      </div>
    </div>
  );
}
