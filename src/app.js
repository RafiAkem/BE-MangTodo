const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const router = require("./routes/index");
const swaggerSetup = require("./config/swagger");

const app = express();

app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
  })
);

// Configure CORS for Android app
app.use(
  cors({
    origin: ["http://10.0.2.2:3000", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    exposedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

swaggerSetup(app);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

// Mount API routes
app.use("/api", router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
