const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");

app.use(express.static("images"));

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    console.log("file", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: Storage });

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/view/index.html`);
});

app.post("/", upload.single("image"), (req, res) => {
  res.sendFile(`${__dirname}/view/index.html`);
});

app.listen(3000, () => {
  console.log(`port Running on 3000`);
});
