// In src/v1/routes/index.js
const express = require("express");
const router = express.Router();
const cors = require('cors');

// Enable CORS for all routes
router.use(cors());
router.route("/").get((req, res) => {
  res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});

module.exports = router;
