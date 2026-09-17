export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-API-Key"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).json({ success: true });
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      error: "Invalid API key"
    });
  }

  const transactionId = req.query.transaction_id;

  if (!transactionId) {
    return res.status(400).json({
      success: false,
      error: "transaction_id is required"
    });
  }

  if (
    typeof transactionId !== "string" ||
    !/^[A-Za-z0-9_-]{5,100}$/.test(transactionId)
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid transaction_id"
    });
  }

  return res.status(200).json({
    success: true,
    transaction_id: transactionId,
    status: "TEST",
    amount: 0,
    currency: "ETB",
    message: "API is working",
    verified_at: new Date().toISOString()
  });
}
