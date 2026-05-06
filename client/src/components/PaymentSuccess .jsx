import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
   
    const shouldClear = localStorage.getItem("shouldClearCart") === "true";
    if (shouldClear) {
      localStorage.removeItem("shouldClearCart");
    }
  }, [dispatch]);

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
        processed. We appreciate your trust in AgroHub.
      </p>

      <div className="flex gap-6">
        <Button
          onClick={() => navigate("/")}
          className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white px-10 py-3 rounded-lg shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        >
          Return to Home
        </Button>

        <Button
          onClick={() => navigate("/products")}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-10 py-3 rounded-lg shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
        >
          Explore More
        </Button>
      </div>
    </div>
  );
}
