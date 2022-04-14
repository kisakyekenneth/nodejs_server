const express = require("express");
const multer = require("multer");
const path = require("path");

// for naming files with random characters
const uuidv4 = require("uuidv4");

const app = express();

//port
const port = 3080;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "passport") {
      cb(null, "./uploads/documents/");
    } else if (file.fieldname === "photo") {
      cb(null, "./uploads/photos/");
    }
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "passport", maxCount: 1 },
  ]),
  (req, res) => {
    //Note: "upload.fields"; is what helps you to specify any fields that multer will upload.

    //This gives you the path to the field for photo
    var photo_path = req.files.photo[0].path;

    //This will give you path for the document
    var document_path = req.files.passport[0].path;

    //Later you can put those variables into the db as you saving

    //Here am just trying to log the data for the variables
    console.log("*** Photo: ", photo_path, " ---: Document: ", document_path);
    res.redirect("/");
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
