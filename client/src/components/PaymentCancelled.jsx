import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { XCircle } from "lucide-react";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("shouldClearCart");
  }, []);

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
          max-w-3xl flex-col
          items-center justify-center
          text-center
        "
      >
        {/* Icon */}
        <div
          className="
            mb-8 flex h-24 w-24
            items-center justify-center
            rounded-[2rem]
            bg-red-100 dark:bg-red-900/20
          "
        >
          <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>

        {/* Heading */}
        <h1
          className="
            text-4xl md:text-5xl
            font-bold
            text-[#1f2937]
            dark:text-white
            font-['Arvo']
          "
        >
          Payment Cancelled
        </h1>

        {/* Description */}
        <p
          className="
            mt-5 max-w-xl
            text-base md:text-lg
            leading-relaxed
            text-gray-600 dark:text-gray-300
          "
        >
          Your payment process was cancelled. No amount has been charged, and
          your cart items are still محفوظ.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="
              cursor-pointer
              rounded-2xl
              bg-[#007200]
              px-8 py-4
              text-white font-medium
              transition-all duration-300
              hover:bg-[#04471c]
            "
          >
            Back to Cart
          </button>

          <button
            onClick={() => navigate("/products")}
            className="
              cursor-pointer
              rounded-2xl
              border border-gray-300
              bg-white
              px-8 py-4
              text-[#1f2937]
              transition-all duration-300
              hover:bg-gray-100
              dark:border-[#3A3A3A]
              dark:bg-[#3A3A3A]
              dark:text-white
              dark:hover:bg-[#444]
            "
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentCancelled;
