// // import React, { useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { Heart, ShoppingCart } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { productData } from "@/data/productData";
// // import { productImages } from "@/data/productImagesData";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addToCart } from "@/features/cartSlice";
// // import { toggleFavourite } from "@/features/favouritesSlice";
// // import { toast } from "sonner";

// // const ItemDetails = () => {
// //   const { category, itemSlug } = useParams();
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   // local spinner state for Add-to-Cart
// //   const [adding, setAdding] = useState(false);

// //   const key = `${category}:${itemSlug}`;
// //   const isLiked = useSelector((s) => s.favourites.items[key]);

// //   const itemData = productData[category]?.[itemSlug];
// //   const imageSrc = productImages[itemSlug];

// //   if (!itemData)
// //     return (
// //       <div className="grid place-items-center h-screen bg-dusty dark:bg-darkbg text-red-600">
// //         Item not found for{" "}
// //         <strong>
// //           {category}/{itemSlug}
// //         </strong>
// //       </div>
// //     );

// //   /* -------------- tap animation shared props -------------- */
// //   const tapProps = {
// //     whileTap: { scale: 0.94 },
// //     transition: { type: "spring", stiffness: 300, damping: 15 },
// //   };

// //   return (
// //     // <div className="w-screen h-screen overflow-x-hidden flex flex-col bg-dusty dark:bg-darkbg text-gray-900 dark:text-gray-100 animate-fade-in">
// //     <div className="w-full max-w-[100vw] min-h-screen overflow-x-hidden bg-[#edf7f6] dark:bg-[#121212]">
// //       {/* back */}
// //       <div className="p-4">
// //         <motion.button
// //           {...tapProps}
// //           onClick={() => navigate(-1)}
// //           className="font-medium underline underline-offset-4 text-live dark:text-live"
// //         >
// //           &larr; Back
// //         </motion.button>
// //       </div>

// //       {/* main flex row/col */}
// //       <div className="flex flex-col md:flex-row flex-1 px-4 pb-32 gap-6 overflow-y-auto">
// //         {/* image */}
// //         {imageSrc && (
// //           <div className="md:w-1/2 w-full flex justify-center items-start">
// //             <img
// //               src={imageSrc}
// //               alt={itemData.name}
// //               className="w-full md:max-w-md rounded-xl shadow-xl border border-white/40"
// //             />
// //           </div>
// //         )}

// //         {/* details */}
// //         <div className="md:w-1/2 w-full bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
// //           <h1 className="text-4xl font-bold text-live dark:text-live mb-4">
// //             {itemData.name}
// //           </h1>
// //           <p className="mb-4 text-lg">{itemData.description}</p>
// //           <p className="text-2xl font-semibold text-live dark:text-green-400">
// //             ₹{itemData.price}
// //           </p>
// //         </div>
// //       </div>

// //       {/* sticky buttons */}
// //       <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-darkbg/95 backdrop-blur-md shadow-[0_-2px_20px_rgba(0,0,0,0.15)] py-4 px-6 flex justify-center gap-4 z-50">
// //         {/* ADD TO CART */}
// //         <motion.button
// //           {...tapProps}
// //           disabled={adding}
// //           className="flex items-center gap-2 bg-[#68d388] text-black font-medium px-5 py-2 rounded-md shadow hover:brightness-110 disabled:opacity-60"
// //           onClick={async () => {
// //             setAdding(true);
// //             dispatch(addToCart({ category, slug: itemSlug, item: itemData }));
// //             toast(`${itemData.name} has been added to your cart.`);
// //             setTimeout(() => setAdding(false), 600); // quick reset
// //           }}
// //         >
// //           {adding ? (
// //             <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
// //               <circle
// //                 cx="12"
// //                 cy="12"
// //                 r="10"
// //                 stroke="currentColor"
// //                 strokeWidth="4"
// //                 fill="none"
// //                 strokeLinecap="round"
// //                 strokeDasharray="60"
// //               />
// //             </svg>
// //           ) : (
// //             <ShoppingCart className="h-5 w-5" />
// //           )}
// //           {adding ? "Adding..." : "Add to Cart"}
// //         </motion.button>

// //         {/* LIKE */}
// //         <motion.button
// //           {...tapProps}
// //           className="flex items-center gap-2 px-5 py-2 rounded-md text-black-600 dark:text-red-500 hover:bg-red-100/60 dark:hover:bg-red-900/40"
// //           onClick={() => {
// //             dispatch(toggleFavourite(key));
// //             toast(
// //               isLiked
// //                 ? `${itemData.name} removed from favourites.`
// //                 : `${itemData.name} added to favourites.`
// //             );
// //           }}
// //         >
// //           <Heart
// //             className={`h-5 w-5 ${
// //               isLiked ? "fill-red-600 dark:fill-red-500" : "fill-none"
// //             }`}
// //           />
// //           {isLiked ? "Liked" : "Like"}
// //         </motion.button>

// //         {/* BUY NOW */}
// //         <motion.button
// //           {...tapProps}
// //           className="bg-[#68d388] hover:bg-red-700 text-black font-medium px-5 py-2 rounded-md shadow"
// //           onClick={() =>
// //             navigate("/payment", {
// //               state: { item: itemData, category, slug: itemSlug },
// //             })
// //           }
// //         >
// //           Buy Now
// //         </motion.button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ItemDetails;


// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Heart, ShoppingCart } from "lucide-react";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { productData } from "@/data/productData";
// import { productImages } from "@/data/productImagesData";
// import { addToCart } from "@/features/cartSlice";
// import { toggleFavourite } from "@/features/favouritesSlice";

// const ItemDetails = () => {
//   const { category, itemSlug } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [adding, setAdding] = useState(false);
//   const key = `${category}:${itemSlug}`;
//   const isLiked = useSelector((state) => state.favourites.items[key]);

//   const itemData = productData[category]?.[itemSlug];
//   const imageSrc = productImages[itemSlug];

//   if (!itemData) {
//     return (
//       <div className="grid place-items-center h-screen bg-dusty dark:bg-darkbg text-red-600">
//         Item not found for{" "}
//         <strong>
//           {category}/{itemSlug}
//         </strong>
//       </div>
//     );
//   }

//   const tapProps = {
//     whileTap: { scale: 0.95 },
//     transition: { type: "spring", stiffness: 300, damping: 20 },
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#edf7f6] dark:bg-[#121212] text-gray-900 dark:text-gray-100">
//       <div className="p-6">
//         <motion.button
//           {...tapProps}
//           onClick={() => navigate(-1)}
//           className="text-live dark:text-live underline font-medium hover:opacity-80"
//         >
//           ← Back
//         </motion.button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-10 px-6 pb-40">
//         {imageSrc && (
//           <div className="md:w-1/2 w-full flex justify-center items-center">
//             <img
//               src={imageSrc}
//               alt={itemData.name}
//               className="rounded-xl shadow-xl border border-white/30 max-w-md w-full object-cover"
//             />
//           </div>
//         )}

//         <div className="md:w-1/2 w-full flex flex-col gap-6 p-6 bg-white/30 dark:bg-white/5 rounded-xl backdrop-blur-md border border-white/20 shadow-md">
//           <h1 className="text-4xl font-bold text-live dark:text-live">
//             {itemData.name}
//           </h1>
//           <p className="text-lg leading-relaxed opacity-90">
//             {itemData.description}
//           </p>
//           <p className="text-3xl font-semibold text-live dark:text-green-400">
//             ₹{itemData.price}
//           </p>
//         </div>
//       </div>

//       <div className="fixed bottom-0 left-0 w-full flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 bg-white/90 dark:bg-darkbg/95 backdrop-blur-lg shadow-[0_-2px_20px_rgba(0,0,0,0.15)] z-50">
//         <div className="flex gap-4 w-full md:w-auto">
//           <motion.button
//             {...tapProps}
//             disabled={adding}
//             onClick={async () => {
//               setAdding(true);
//               dispatch(addToCart({ category, slug: itemSlug, item: itemData }));
//               toast(`${itemData.name} has been added to your cart.`);
//               setTimeout(() => setAdding(false), 600);
//             }}
//             className="flex items-center gap-2 bg-[#68d388] text-black px-5 py-2 rounded-md font-medium shadow hover:brightness-110 disabled:opacity-50"
//           >
//             {adding ? (
//               <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                   fill="none"
//                   strokeLinecap="round"
//                   strokeDasharray="60"
//                 />
//               </svg>
//             ) : (
//               <ShoppingCart className="h-5 w-5" />
//             )}
//             {adding ? "Adding..." : "Add to Cart"}
//           </motion.button>

//           <motion.button
//             {...tapProps}
//             onClick={() => {
//               dispatch(toggleFavourite(key));
//               toast(
//                 isLiked
//                   ? `${itemData.name} removed from favourites.`
//                   : `${itemData.name} added to favourites.`
//               );
//             }}
//             className="flex items-center gap-2 px-5 py-2 rounded-md text-red-600 dark:text-red-500 hover:bg-red-100/60 dark:hover:bg-red-900/30"
//           >
//             <Heart
//               className={`h-5 w-5 ${
//                 isLiked ? "fill-red-600 dark:fill-red-500" : "fill-none"
//               }`}
//             />
//             {isLiked ? "Liked" : "Like"}
//           </motion.button>
//         </div>

//         <motion.button
//           {...tapProps}
//           onClick={() =>
//             navigate("/payment", {
//               state: { item: itemData, category, slug: itemSlug },
//             })
//           }
//           className="bg-[#68d388] hover:bg-green-600 text-black px-6 py-2 rounded-md font-medium shadow-md"
//         >
//           Buy Now
//         </motion.button>
//       </div>
//     </div>
//   );
// };

// export default ItemDetails;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { productData } from "@/data/productData";
import { productImages } from "@/data/productImagesData";
import { addToCart } from "@/features/cartSlice";
import { toggleFavourite } from "@/features/favouritesSlice";

const ItemDetails = () => {
  const { category, itemSlug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);
  const key = `${category}:${itemSlug}`;
  const isLiked = useSelector((state) => state.favourites.items[key]);

  const itemData = productData[category]?.[itemSlug];
  const imageSrc = productImages[itemSlug];

  if (!itemData) {
    return (
      <div className="grid place-items-center h-screen bg-dusty dark:bg-darkbg text-red-600">
        Item not found for{" "}
        <strong>
          {category}/{itemSlug}
        </strong>
      </div>
    );
  }

  const tapProps = {
    whileTap: { scale: 0.94 },
    transition: { type: "spring", stiffness: 300, damping: 15 },
  };

  return (
    <div className="w-full max-w-[100vw] min-h-screen overflow-x-hidden bg-[#edf7f6] dark:bg-[#121212] text-gray-900 dark:text-gray-100">
      <div className="p-4">
        <motion.button
          {...tapProps}
          onClick={() => navigate(-1)}
          className="font-medium underline underline-offset-4 text-live dark:text-live"
        >
          &larr; Back
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 px-4 pb-32 gap-6 overflow-y-auto">
        {imageSrc && (
          <div className="md:w-1/2 w-full flex justify-center items-start">
            <img
              src={imageSrc}
              alt={itemData.name}
              className="w-full md:max-w-md rounded-xl shadow-xl border border-white/40 object-cover"
            />
          </div>
        )}

        <div className="md:w-1/2 w-full bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
          <h1 className="text-4xl font-bold text-live dark:text-live mb-4">
            {itemData.name}
          </h1>
          <p className="mb-4 text-lg leading-relaxed text-gray-800 dark:text-gray-200">
            {itemData.description}
          </p>
          <p className="text-2xl font-semibold text-live dark:text-green-400">
            ₹{itemData.price}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-[#edf7f6] dark:bg-[#1c1919] backdrop-blur-md shadow-[0_-2px_20px_rgba(0,0,0,0.15)] py-4 px-6 flex justify-center gap-4 z-50">
        <motion.button
          {...tapProps}
          disabled={adding}
          className="flex items-center gap-2 bg-[#68d388] text-black font-medium px-5 py-2 rounded-md shadow hover:brightness-110 disabled:opacity-60"
          onClick={async () => {
            setAdding(true);
            dispatch(addToCart({ category, slug: itemSlug, item: itemData }));
            toast(`${itemData.name} has been added to your cart.`);
            setTimeout(() => setAdding(false), 600);
          }}
        >
          {adding ? (
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="60"
              />
            </svg>
          ) : (
            <ShoppingCart className="h-5 w-5" />
          )}
          {adding ? "Adding..." : "Add to Cart"}
        </motion.button>

        <motion.button
          {...tapProps}
          className="flex items-center gap-2 px-5 py-2 rounded-md text-black-600 dark:text-red-500 hover:bg-red-100/60 dark:hover:bg-red-900/40"
          onClick={() => {
            dispatch(toggleFavourite(key));
            toast(
              isLiked
                ? `${itemData.name} removed from favourites.`
                : `${itemData.name} added to favourites.`
            );
          }}
        >
          <Heart
            className={`h-5 w-5 ${
              isLiked ? "fill-red-600 dark:fill-red-500" : "fill-none"
            }`}
          />
          {isLiked ? "Liked" : "Like"}
        </motion.button>

        <motion.button
          {...tapProps}
          className="bg-[#68d388] hover:bg-red-700 text-black font-medium px-5 py-2 rounded-md shadow"
          onClick={() =>
            navigate("/payment", {
              state: { item: itemData, category, slug: itemSlug },
            })
          }
        >
          Buy Now
        </motion.button>
      </div>
    </div>
  );
};

export default ItemDetails;
