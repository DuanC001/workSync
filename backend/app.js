const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const router = require("./routes");
require("./models/db");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.status(404);
  res.send("404 File Does not Exist");
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
