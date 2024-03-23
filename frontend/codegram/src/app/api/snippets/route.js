// /api/snippets.js

export async function GET() {
  try {
    const response = await fetch(
      `http://${
        process.env.HOST_NAME || "localhost"
      }:5000/api/code-snippets/snippets`,
      { cache: "no-store" },
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching submissions" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
