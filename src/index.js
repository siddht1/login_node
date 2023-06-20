const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for specific origin
app.use(cors({
  // origin: "https://example.com"
}));

// Define the static files directory
app.use(express.static(path.join(__dirname, "static")));

// Parse request body and extended the size to 1mb
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// GET route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

// POST route
app.post("/", (req, res) => {
  console.log("POST request received");
  let data = {};
  data['POST'] = req.body;
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
