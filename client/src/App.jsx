import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
import ItemDetails from "./pages/ItemDetails";
import Payment from "./pages/Payment";
import PaymentSuccess from "./components/PaymentSuccess ";
import PaymentCancelled from "./components/PaymentCancelled";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import VendorDashboard from "./pages/VendorDashboard";
import EditProduct from "./pages/EditProduct";
import VendorRoute from "./components/VendorRoute";
import Orders from "./pages/Orders";
import Bookings from "./pages/Bookings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* public / index */}
      <Route index element={<Home />} />
      {/* protected pages */}
      <Route
        path="products/category/:category"
        element={
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="products/item/:productId"
        element={
          <ProtectedRoute>
            <ItemDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <VendorRoute>
            <AddProduct />
          </VendorRoute>
        }
      />
      <Route
        path="about"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
      <Route
        path="contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="favourites"
        element={
          <ProtectedRoute>
            <Favourites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/dashboard"
        element={
          <VendorRoute>
            <VendorDashboard />
          </VendorRoute>
        }
      />
      <Route
        path="/products/edit/:productId"
        element={
          <VendorRoute>
            <EditProduct />
          </VendorRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-cancelled"
        element={
          <ProtectedRoute>
            <PaymentCancelled />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      {/* auth & fallback */}
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

const App = () => <RouterProvider router={router} />;

export default App;
