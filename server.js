const path = require("path");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

require("dotenv").config();

const express = require("express");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "backend", "views"));
app.set("view engine", "ejs");
app.use(
  express.static(path.join(__dirname, "backend", "static"), {
    // Specify the MIME types
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript");
      }
    },
  })
);

const rootRoutes = require("./backend/routes/root");
const testRoutes = require("./backend/routes/index.js");

app.use("/test", testRoutes);
app.use("/", rootRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);
  // Store the data in the database or perform any other required operations

  res.redirect("/"); // Redirect to the home page
});


app.use((request, response, next) => {
  next(createError(404));
});
