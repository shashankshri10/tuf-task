// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const codeSnippetRoutes = require("./routes/codeSnippetRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/code-snippets", codeSnippetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
