// src/components/ui/sonner.jsx
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        // default toast (non-success/error)
        "--normal-bg": "linear-gradient(to right, #e6f4ea, #d1fae5)", // greenish gradient
        "--normal-text": "#064e3b", // dark green
        "--normal-border": "#10b981", // emerald
        // success
        "--success-bg": "#10b981",
        "--success-text": "#ffffff",
        "--success-border": "#047857",
        // error
        "--error-bg": "#dc2626",
        "--error-text": "#ffffff",
        "--error-border": "#991b1b",
      }}
      toastOptions={{
        classNames: {
          toast: "border shadow-md rounded-md font-medium text-sm",
          description: "text-sm text-muted-foreground",
          actionButton: "bg-green-600 text-white hover:bg-green-700",
          cancelButton:
            "bg-transparent border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
        },
        duration: 3000,
        // closeButton: true,
      }}
      {...props}
    />
  );
};

export { Toaster };
