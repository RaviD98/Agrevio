import React from "react";

const EmptyState = ({
  title = "Nothing found",
  description = "No data available right now.",
  icon = "📦",
}) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center text-center max-w-md">
        <div className="mb-4 flex items-center justify-center">
          {typeof icon === "string" ? (
            <span className="text-6xl">{icon}</span>
          ) : (
            icon
          )}
        </div>

        <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
          {title}
        </h2>

        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
