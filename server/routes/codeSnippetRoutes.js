// routes/codeSnippetRoutes.js
const express = require("express");
const router = express.Router();
const codeSnippetController = require("../controllers/codeSnippetController");

// Route to get code snippet data (apply caching middleware)
// router.get('/snippets', codeSnippetController.cacheMiddleware, codeSnippetController.getCodeSnippets);

// without caching
router.get(
  "/snippets",
  codeSnippetController.getCodeSnippets
);

// Route to submit code snippet data (save to cache) 
// router.post('/submit', codeSnippetController.submitCodeSnippet, codeSnippetController.saveToCache);

// without caching
router.post(
  "/submit",
  codeSnippetController.submitCodeSnippet,
);

module.exports = router;
