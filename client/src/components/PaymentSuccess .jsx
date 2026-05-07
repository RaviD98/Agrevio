import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useCreateOrderMutation } from "@/features/api/orderApi";

import { CheckCircle2 } from "lucide-react";
import { FiCheck } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";

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
    <section
      className="
        min-h-screen
        bg-[#FBFAF5]
        dark:bg-[#2C2C2C]
        transition-colors duration-300
        px-4 py-10
        font-['Inter']
      "
    >
      <div
        className="
          mx-auto flex min-h-[85vh]
          max-w-4xl flex-col
          items-center justify-center
          text-center
        "
      >
        {/* Icon */}
        <div
          className="
            mb-8 flex h-24 w-24
            items-center justify-center
            
          "
        >
          <FaRegThumbsUp className="h-25 w-25 text-[#007200]" />
        </div>

        {/* Heading */}
        <h1
          className="
            text-4xl sm:text-5xl md:text-6xl
            leading-tight
            font-bold
            text-[#007200]
            dark:text-green-300
            font-['Arvo']
          "
        >
          Payment Successful
        </h1>

        {/* Description */}
        <p
          className="
            mt-6 max-w-2xl
            text-base md:text-lg
            leading-relaxed
            text-gray-600 dark:text-gray-300
          "
        >
          Thank you for your purchase. Your order has been confirmed
          successfully and is now being processed.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate("/")}
            className="
              cursor-pointer
              rounded-2xl
              bg-[#007200]
              px-8 py-6
              text-base font-medium text-white
              transition-all duration-300
              hover:bg-[#04471c]
            "
          >
            Return Home
          </Button>

          <Button
            onClick={() => navigate("/orders")}
            className="
              cursor-pointer
              rounded-2xl
              border border-gray-300
              bg-white
              px-8 py-6
              text-base
              text-[#1f2937]
              transition-all duration-300
              hover:bg-gray-100
              dark:border-[#3A3A3A]
              dark:bg-[#3A3A3A]
              dark:text-white
              dark:hover:bg-[#444]
            "
          >
            View Orders
          </Button>
        </div>
      </div>
    </section>
  );
}
