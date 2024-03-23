// /api/snippets/submit-code.js

export async function POST(req2) {
    const req = await req2.json();
    const { username, lang_id, stdin, code } = req;
  try {
    const response = await fetch(
      `http://${
        process.env.HOST_NAME || "localhost"
      }:5000/api/code-snippets/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          lang_id,
          stdin,
          code,
        }),
      }
    );

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Submission error:", error);
    return new Response(JSON.stringify({ error: "Submission error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
