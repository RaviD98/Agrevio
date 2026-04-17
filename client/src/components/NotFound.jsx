import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Leaf } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 dark:bg-gray-900 px-6 text-center">
      <Leaf
        className="w-24 h-24 mb-6 text-green-600 dark:text-green-400 animate-bounce"
        aria-hidden="true"
      />
      <h1 className="text-[8rem] font-extrabold text-green-700 dark:text-green-400 tracking-wide select-none leading-none">
        404
      </h1>
      <p className="text-lg md:text-2xl font-semibold text-green-900 dark:text-green-200 mt-4 mb-10 max-w-lg mx-auto leading-relaxed">
        Oops! Looks like this page wandered off the farm. We can’t seem to find
        what you’re looking for.
      </p>
      <Button
        onClick={() => navigate("/")}
        className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white px-10 py-3 rounded-lg shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
      >
        Return to Home
      </Button>
    </div>
  );
};

export default NotFound;
