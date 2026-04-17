import React, { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Simulate successful submission
    console.log("Form submitted:", form);
    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="min-h-screen dark:bg-[#121212] bg-[#edf7f6] px-4 py-16 flex items-center justify-center"
      
    >
      <div
        className="max-w-3xl w-full rounded-2xl shadow-lg p-8 md:p-12 border"
        // style={{
        //   backgroundColor: "#ffffff",
        //   borderColor: "#68d388",
        // }}
      >
        <h2 className="text-4xl font-bold text-green-700 text-center mb-4 dark:text-green-400">
          Contact Us
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-10 text-lg">
          We'd love to hear from you! Fill out the form and we'll be in touch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute top-3 left-3 text-green-600 dark:text-green-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div className="relative">
            <Mail className="absolute top-3 left-3 text-green-600 dark:text-green-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute top-3 left-3 text-green-600 dark:text-green-400" />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Write your message here..."
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            style={{ backgroundColor: "#68d388" }}
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Or email us directly at{" "}
          <a
            href="mailto:support@example.com"
            className="text-green-600 dark:text-green-400 underline hover:text-green-800 dark:hover:text-green-300"
          >
            support@example.com
          </a>
        </div>
      </div>

      {/* Dark mode support */}
      <style jsx="true">{`
        html.dark .min-h-screen {
          background-color: #121212;
        }
      `}</style>
    </div>
  );
};

export default Contact;
