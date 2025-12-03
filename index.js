const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/supplier", require("./routes/supplier"));

app.get("/", (req, res) => {
  res.send("Deyarak Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
