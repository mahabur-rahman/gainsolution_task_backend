const express = require("express");
const app = express();
const colors = require("colors");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

// env config
dotenv.config();
const PORT = process.env.PORT || 5000;
// connect with mongodb atlas
const connectedDB = require("./db/connect");
connectedDB();

// ROUTE
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");
const eventRoute = require("./routes/events.route");
const categoryRoute = require("./routes/category.route");

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// upload an image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


// middleware
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/categories", categoryRoute);

// listen
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
