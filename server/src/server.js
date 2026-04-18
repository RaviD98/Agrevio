import "./env.js";
import connectDB from "./config/db.js";
import app from "./app.js";
import userRoutes from "./routes/user.routes.js";

connectDB();

const PORT = process.env.PORT || 8000;

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
