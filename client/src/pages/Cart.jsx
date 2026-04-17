// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, clearCart } from "@/features/cartSlice";
// import { Button } from "@/components/ui/button";
// import CheckoutButton from "@/components/CheckoutButton";

// const Cart = () => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();
//   const entries = Object.entries(cartItems);
//   const totalPrice = entries.reduce(
//     (sum, [, { qty, data }]) => sum + data.price * qty,
//     0
//   );

//   if (!entries.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-8 bg-white dark:bg-black">
//         <p className="text-center text-lg font-medium text-green-700 dark:text-gray-400">
//           Your cart is empty.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`
//         max-w-4xl mx-auto p-8 min-h-[80vh] rounded-xl flex flex-col
//         bg-gradient-to-br from-green-50 to-green-100 shadow-md
//         dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950
//         dark:border dark:border-gray-700 dark:shadow-xl
//         transition-colors duration-500
//       `}
//     >
//       <h2 className="text-3xl font-bold mb-8 text-green-800 dark:text-white">
//         Your Shopping Cart
//       </h2>

//       <ul className="flex-grow space-y-4 overflow-auto">
//         {entries.map(([key, { qty, data }]) => (
//           <li
//             key={key}
//             className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg
//                        border border-green-200 dark:border-gray-700
//                        bg-white hover:bg-green-50
//                        dark:bg-gray-800 dark:hover:bg-gray-700
//                        transition"
//           >
//             <div>
//               <h3 className="text-lg font-semibold text-green-900 dark:text-white">
//                 {data.name}
//               </h3>
//               <p className="text-green-700 dark:text-gray-300 mt-1">
//                 ₹{data.price} × {qty}{" "}
//                 <span className="font-medium dark:text-white">
//                   = ₹{data.price * qty}
//                 </span>
//               </p>
//             </div>

//             <Button
//               variant="destructive"
//               className="mt-4 sm:mt-0"
//               onClick={() => dispatch(removeFromCart(key))}
//             >
//               Remove
//             </Button>
//           </li>
//         ))}
//       </ul>

//       <footer
//         className="mt-8 pt-6 border-t border-green-300 dark:border-gray-700
//                    flex flex-col sm:flex-row justify-between items-center
//                    dark:bg-transparent"
//       >
//         <p className="text-2xl font-bold text-green-800 dark:text-white">
//           Total: ₹{totalPrice}
//         </p>
//         <CheckoutButton />
//         <Button
//           variant="destructive"
//           className="mt-4 sm:mt-0"
//           onClick={() => dispatch(clearCart())}
//         >
//           Clear Cart
//         </Button>
//       </footer>
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "@/features/cartSlice";
import { Button } from "@/components/ui/button";
import CheckoutButton from "@/components/CheckoutButton";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const entries = Object.entries(cartItems);
  const totalPrice = entries.reduce(
    (sum, [, { qty, data }]) => sum + data.price * qty,
    0
  );

  if (!entries.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#edf7f6] dark:bg-[#121212]">
        <p className="text-center text-lg font-medium text-green-700 dark:text-gray-400">
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#edf7f6] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-8 rounded-xl shadow-lg bg-white dark:bg-[#1A1A1A] border dark:border-[#2A2A2A]">
        <h2 className="text-3xl font-bold mb-8 text-green-800 dark:text-white">
          Your Shopping Cart
        </h2>

        <ul className="space-y-4 overflow-auto">
          {entries.map(([key, { qty, data }]) => (
            <li
              key={key}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg
                         border border-green-200 dark:border-[#2A2A2A]
                         bg-white hover:bg-[#e4f9df]
                         dark:bg-[#1A1A1A] dark:hover:bg-[#2A2A2A]
                         transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-white">
                  {data.name}
                </h3>
                <p className="text-green-700 dark:text-gray-300 mt-1">
                  ₹{data.price} × {qty}{" "}
                  <span className="font-medium dark:text-white">
                    = ₹{data.price * qty}
                  </span>
                </p>
              </div>

              <Button
                variant="destructive"
                className="mt-4 sm:mt-0"
                onClick={() => dispatch(removeFromCart(key))}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>

        <footer
          className="mt-8 pt-6 border-t border-green-300 dark:border-gray-700
                     flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-2xl font-bold text-green-800 dark:text-white">
            Total: ₹{totalPrice}
          </p>

          <CheckoutButton />

          <Button
            className="bg-[#68d388] hover:bg-green-600 text-white mt-4 sm:mt-0"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Cart;
