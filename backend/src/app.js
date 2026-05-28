const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const env = require("./config/env");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const reactDist = path.resolve(process.cwd(), "..", "Frontend", "dist");

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.frontendOrigin === "*" ? true : env.frontendOrigin, credentials: true }));

app.use(helmet({ 
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: [
        "'self'", 
        "data:", 
        "blob:", 
        "https://images.unsplash.com", 
        "https://lh3.googleusercontent.com", 
        "*.amazonaws.com"
      ],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"]
    }
  }
}));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.get("/health", (req, res) => {
  res.json({ success: true, status: "ok", message: "Lumora API is healthy" });
});

app.get("/debug", (req, res) => {
  const env = require("./config/env");
  res.json({
    dbHost: env.db.host,
    poolHost: require("./config/database").pool.config.connectionConfig.host,
    envDbHost: process.env.DB_HOST
  });
});

app.use("/api/v1", routes);

// Serve React built static assets
app.use(express.static(reactDist));

// Fallback for all UI routes to index.html for Single Page App
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/uploads") || req.path.startsWith("/health")) {
    return next();
  }
  res.sendFile(path.join(reactDist, "index.html"));
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
