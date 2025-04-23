import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import userRoutes from './routes/userRoutes.js'

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
