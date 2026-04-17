import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { productData } from "@/data/productData";
import { Link } from "react-router-dom";
import { toggleFavourite } from "@/features/favouritesSlice";

const categoryIcons = {
  seeds: "🌱",
  irrigation: "💧",
  machinery: "🚜",
  tools: "🛠️",
  fertilizers: "🌿",
  pesticides: "🧴",
  greenhouse: "🏡",
  feed: "🐄",
  storage: "📦",
};

const categoryColors = {
  seeds: "bg-green-200 dark:bg-green-700 text-green-700 dark:text-green-300",
  irrigation: "bg-blue-200 dark:bg-blue-700 text-blue-700 dark:text-blue-300",
  machinery:
    "bg-yellow-200 dark:bg-yellow-700 text-yellow-700 dark:text-yellow-300",
  tools: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
  fertilizers: "bg-lime-200 dark:bg-lime-700 text-lime-700 dark:text-lime-300",
  pesticides: "bg-pink-200 dark:bg-pink-700 text-pink-700 dark:text-pink-300",
  greenhouse: "bg-teal-200 dark:bg-teal-700 text-teal-700 dark:text-teal-300",
  feed: "bg-orange-200 dark:bg-orange-700 text-orange-700 dark:text-orange-300",
  storage:
    "bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-300",
};

const Favourites = () => {
  const dispatch = useDispatch();
  const favs = useSelector((s) => s.favourites.items);
  const keys = Object.keys(favs).filter((k) => favs[k]);

  if (!keys.length)
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: "#edf7f6" }}
      >
        <p className="text-center text-xl text-green-800 dark:text-green-400 font-semibold">
          No favourites yet.
        </p>

        <style jsx="true">{`
          html.dark .min-h-screen {
            background-color: #121212;
          }
        `}</style>
      </div>
    );

  return (
    <div
      className="min-h-screen w-full p-8 flex flex-col"
      style={{ backgroundColor: "#edf7f6" }}
    >
      <h1 className="text-4xl font-extrabold mb-8 text-green-900 dark:text-green-300 tracking-tight text-center">
        Your Favourite Products
      </h1>

      <div className="flex-grow overflow-auto max-w-6xl mx-auto w-full">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {keys.map((key) => {
            const [category, slug] = key.split(":");
            const data = productData[category]?.[slug];
            if (!data) return null;

            return (
              <li
                key={key}
                className="group flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 rounded-2xl border border-green-300 p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div
                  className={`flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center text-5xl font-bold select-none
                    ${
                      categoryColors[category] ||
                      "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }
                  `}
                  aria-hidden="true"
                >
                  {categoryIcons[category] || "❓"}
                </div>

                <div className="flex flex-col flex-grow">
                  <Link
                    to={`/products/${category}/${slug}`}
                    className="text-2xl font-bold text-green-900 dark:text-green-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors"
                  >
                    {data.name}
                  </Link>
                  <p className="mt-1 text-green-700 dark:text-green-300 font-semibold text-lg">
                    ₹{data.price.toLocaleString()}
                  </p>
                  <p className="mt-2 text-green-800 dark:text-green-400 text-sm sm:text-base">
                    {data.description}
                  </p>
                </div>

                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3 mt-4 sm:mt-0">
                  <Link
                    to={`/products/${category}/${slug}`}
                    className="inline-block rounded-md px-6 py-2 text-white font-semibold transition-colors text-center"
                    style={{ backgroundColor: "#68d388" }}
                  >
                    View Details
                  </Link>

                  <button
                    type="button"
                    onClick={() => dispatch(toggleFavourite(key))}
                    className="inline-block rounded-md border text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:border-green-400 dark:text-green-300 dark:hover:bg-green-700 px-6 py-2 font-semibold transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx="true">{`
        html.dark .min-h-screen {
          background-color: #121212;
        }

        html.dark li {
          background-color: #1a1a1a;
          border-color: #275e47;
        }
      `}</style>
    </div>
  );
};

export default Favourites;
