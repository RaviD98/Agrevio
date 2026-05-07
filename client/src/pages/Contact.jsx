import React, { useState } from "react";

import { Mail, User, MessageSquare } from "lucide-react";

import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    console.log("Form submitted:", form);

    toast.success("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      className="
        min-h-screen
        bg-[#FBFAF5]
        dark:bg-[#2C2C2C]
        transition-colors duration-300
        px-4 py-16
        font-['Manrope']
      "
    >
      <div className="mx-auto max-w-2xl">
        {/* Card */}
        <div
          className="
            rounded-[2rem]
            border border-gray-200
            bg-white
            p-6 sm:p-8 md:p-10
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            dark:border-[#4A4A4A]
            dark:bg-[#3A3A3A]
            dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)]
          "
        >
          {/* Heading */}
          <div className="text-center">
            <p
              className="
                mb-3 text-sm
                font-semibold uppercase tracking-[0.2em]
                text-[#007200]
              "
            >
              Contact
            </p>

            <h1
              className="
                text-4xl md:text-5xl
                font-bold
                text-[#007200]
                dark:text-green-300
                font-['Arvo']
              "
            >
              Get In Touch
            </h1>

            <p
              className="
                mt-4 text-base leading-relaxed
                text-gray-600 dark:text-gray-300
              "
            >
              We'd love to hear from you. Send us a message and our team will
              get back to you soon.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {/* Name */}
            <div className="relative">
              <User
                className="
                  absolute left-4 top-1/2
                  h-5 w-5 -translate-y-1/2
                  text-[#007200]
                "
              />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="
                  w-full rounded-2xl
                  border border-gray-200
                  bg-[#FBFAF5]
                  py-3 pl-12 pr-4
                  text-sm text-gray-800
                  outline-none transition-all duration-300
                  placeholder:text-gray-400
                  focus:border-[#007200]
                  focus:ring-4 focus:ring-[#007200]/10
                  dark:border-[#4A4A4A]
                  dark:bg-[#2C2C2C]
                  dark:text-white
                "
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                className="
                  absolute left-4 top-1/2
                  h-5 w-5 -translate-y-1/2
                  text-[#007200]
                "
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="
                  w-full rounded-2xl
                  border border-gray-200
                  bg-[#FBFAF5]
                  py-3 pl-12 pr-4
                  text-sm text-gray-800
                  outline-none transition-all duration-300
                  placeholder:text-gray-400
                  focus:border-[#007200]
                  focus:ring-4 focus:ring-[#007200]/10
                  dark:border-[#4A4A4A]
                  dark:bg-[#2C2C2C]
                  dark:text-white
                "
              />
            </div>

            {/* Message */}
            <div className="relative">
              <MessageSquare
                className="
                  absolute left-4 top-4
                  h-5 w-5
                  text-[#007200]
                "
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Write your message..."
                className="
                  w-full resize-none
                  rounded-2xl
                  border border-gray-200
                  bg-[#FBFAF5]
                  py-3 pl-12 pr-4
                  text-sm text-gray-800
                  outline-none transition-all duration-300
                  placeholder:text-gray-400
                  focus:border-[#007200]
                  focus:ring-4 focus:ring-[#007200]/10
                  dark:border-[#4A4A4A]
                  dark:bg-[#2C2C2C]
                  dark:text-white
                "
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="
                w-full cursor-pointer
                rounded-2xl
                bg-[#007200]
                py-3.5
                text-sm font-semibold text-white
                transition-all duration-300
                hover:bg-[#04471c]
              "
            >
              Send Message
            </button>
          </form>

          {/* Footer */}
          <div
            className="
              mt-8 text-center
              text-sm text-gray-500
              dark:text-gray-400
            "
          >
            Or email us directly at{" "}
            <a
              href="mailto:support@example.com"
              className="
                cursor-pointer
                font-medium
                text-[#007200]
                transition-colors duration-300
                hover:text-[#04471c]
              "
            >
              support@example.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
