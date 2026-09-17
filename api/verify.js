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

  // API KEY
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      error: "Invalid API key"
    });
  }

  // Transaction ID
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

  // Ethiopia Time
  const now = new Date();

  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Addis_Ababa",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Addis_Ababa",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now);

  // TEST RESPONSE
  return res.status(200).json({
    success: true,
    transaction_id: transactionId,
    name: "TEST USER",
    status: "SUCCESS",
    amount: 100,
    currency: "ETB",
    date: date,
    time: time
  });
}
