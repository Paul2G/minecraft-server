const express = require("express");
const path = require("path");
const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 10, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});

const app = express();
app.use(limiter);
const PORT = 3000;

// specify the folder to serve
const staticFolder = path.join(__dirname, "public");

// serve static files from the folder
app.use(express.static(staticFolder));

// start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
