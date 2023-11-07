const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");

//database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

//middlewares
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

//image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "./images");
  },
  filename: (req, file, fn) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    fn(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

const handleFileUpload = (req) => {
  return new Promise((resolve, reject) => {
    upload.single("file")(req, null, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(req.file);
      }
    });
  });
};
app.post("/api/upload", (req, res) => {
  handleFileUpload(req)
    .then((file) => {
      if (file) {
        console.log(file);
        res.status(200).json({
          message: "success",
          filename: `http://localhost:3000/${file.path}`,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "error",
      });
    });
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("app is running on port " + process.env.PORT);
});
