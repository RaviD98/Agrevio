import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("shouldClearCart");
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
      <button
        onClick={() => navigate("/cart")}
        className="text-green-600 underline"
      >
        Back to cart
      </button>
    </div>
  );
};
export default PaymentCancelled;
