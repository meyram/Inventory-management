const express = require("express");
const productRouter = require("./routes/product");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");

dotenv.config();

const app = express();
const PORT = 5000;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/product", productRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
