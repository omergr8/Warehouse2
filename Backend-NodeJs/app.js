var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");

const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
let environment = process.env;
const connect = mongoose.connect(environment.DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: "*",
};
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Shop WareHouse",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      token: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};
const options = {
  swaggerDefinition,
  apis: ["./controllers/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

var indexRouter = require("./routes/index");
var treeDataRouter = require("./routes/trees");
var warehouseRouter = require("./routes/warehouses");
var shopRouter = require("./routes/shops");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "build")));
app.use(cors(corsOptions));
app.use("/api", indexRouter);
app.use("/api/trees", treeDataRouter);
app.use("/api/warehouses", warehouseRouter);
app.use("/api/shops", shopRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("build"));
}
// app.use("*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
module.exports = app;
