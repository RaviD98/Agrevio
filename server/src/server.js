import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production" ? ".env.production" : ".env.local",
});

import connectDB from "./config/db.js";
import app from "./app.js";
import userRoutes from "./routes/user.routes.js";

connectDB();
import './env.js'

const PORT = process.env.PORT || 8000;

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
