import React from "react";

import {  BarLoader, SyncLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <BarLoader color="#16a34a" size={20} />

      {/* <p className="mt-6 text-gray-600 dark:text-gray-400">Loading...</p> */}
    </div>
  );
};

export default LoadingScreen;