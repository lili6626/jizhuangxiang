export async function onRequestPost(context) {
  const { request, env } = context;
  const { messages } = await request.json();

  try {
    const response = await fetch(
      "https://kspmas.ksyun.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.KSC_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-v3.2",
          messages,
          temperature: 0.8,
          max_tokens: 2000,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
