import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10">
        {/* About AgroHub */}
        <div className="md:col-span-3">
          <h3 className="text-xl font-semibold mb-4">About AgroHub</h3>
          <p className="text-sm leading-relaxed">
            AgroHub is your one-stop online marketplace for all agricultural
            needs. Find everything from tractors to irrigation equipment on a
            single platform designed to empower farmers and agri-entrepreneurs.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className="hover:text-green-400">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="hover:text-green-400">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className="hover:text-green-400">
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/offers" className="hover:text-green-400">
                Offers
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-green-400">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-green-400">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <address className="text-sm space-y-2 not-italic">
            <p>
              123 Greenfield Road
              <br />
              Farmville, Country
            </p>
            <p>Phone: +1 234 567 8901</p>
            <p>Email: support@agrohub.com</p>
          </address>
        </div>

        {/* Follow Us */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <ul className="flex flex-wrap gap-4 text-sm">
            <li>
              <a href="#" className="hover:text-green-400">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/faq" className="hover:text-green-400">
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink to="/shipping" className="hover:text-green-400">
                Shipping & Delivery
              </NavLink>
            </li>
            <li>
              <NavLink to="/returns" className="hover:text-green-400">
                Returns & Exchanges
              </NavLink>
            </li>
            <li>
              <NavLink to="/warranty" className="hover:text-green-400">
                Warranty & Repairs
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3">
          <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
          <p className="text-sm mb-4">
            Get updates on new arrivals and special offers directly to your
            inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white transition font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 dark:border-gray-700 py-4 mt-6">
        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} AgroHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
