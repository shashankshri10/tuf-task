// controllers/codeSnippetController.js
const pool = require("../config/db");
// const redisClient = require("../config/redisClient");
const langs = require("./langs.json");
const axios = require("axios");

const getLanguageNameById = (lang_id) => {
  for (const el of langs) {
    if (el.id == lang_id) return el.name;
  }
  return null;
};
const submitToJudge = async (language_id, source_code, stdin) => {
  const obj = JSON.stringify({ language_id, source_code, stdin });
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "36fc609e58msh471814a2573dbafp18377ajsna237865d8533",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: obj,
  };
  const getRes = async (token) => {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: "false",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": "36fc609e58msh471814a2573dbafp18377ajsna237865d8533",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    const token = response.data.token;

    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await getRes(token);
          console.log("Result from getRes:", result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, 2000);
    });
  } catch (error) {
    console.error(error);
  }
};

exports.submitCodeSnippet = async (req, res) => {
  const { username, lang_id, stdin, code } = req.body;

  // Assuming you have a function to retrieve the language ID based on the language name
  const language = getLanguageNameById(lang_id);

  if (!language) {
    return res.status(400).json({ error: "Invalid language" });
  }
  const resObj = await submitToJudge(lang_id, code, stdin);
  const sub_status = await resObj.status.description;
  const stdout = await resObj.stdout;

  const sql =
    "INSERT INTO code_snippets (username, language, lang_id, stdin, code,sub_status,stdout) VALUES (?, ?, ?, ?, ?, ?, ?)";
  pool.query(
    sql,
    [username, language, lang_id, stdin, code,sub_status,stdout],
    (err, results) => {
      if (err) {
        console.error("Error submitting code snippet:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res
        .status(200)
        .json({ message: "Code snippet submitted successfully", stdout: stdout,sub_status:sub_status });
    }
  );
};

exports.getCodeSnippets = (req, res) => {
  const sql =
    "SELECT id, username, language, SUBSTRING(code, 1, 100) AS code_preview, submission_time,sub_status,stdout FROM code_snippets";
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving code snippets:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
};

// // Middleware to cache code snippet data
// exports.cacheMiddleware = (req, res, next) => {
//   const key = req.originalUrl;
//   redisClient.get(key, (err, data) => {
//     if (err) {
//       console.error("Redis error:", err);
//       next(); // Proceed to the next middleware or route handler
//       return;
//     }
//     if (data) {
//       res.json(JSON.parse(data)); // Return cached data
//     } else {
//       next(); // Proceed to the next middleware or route handler
//     }
//   });
// };

// // Route handler to save code snippet data to cache
// exports.saveToCache = (req, res, next) => {
//   const key = req.originalUrl;
//   const data = JSON.stringify(res.locals.data); // Data to be cached
//   redisClient.setex(key, 3600, data); // Set data with expiration time (e.g., 1 hour)
//   next(); // Proceed to the next middleware or route handler
// };
