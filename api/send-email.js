// Vercel serverless function: Admin bulk email via MailerSend API
const MAILERSEND_API_URL = "https://api.mailersend.com/v1/email";
const DEFAULT_FROM_EMAIL = "info@binovivo.ca";
const DEFAULT_FROM_NAME = "Bino & Vivo";
const ALLOWED_ORIGINS = ["https://binovivo.ca", "https://www.binovivo.ca", "http://localhost:5173", "http://localhost:3000"];
const FIREBASE_VERIFY_URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=";

function getCorsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function stripHtmlTags(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function verifyFirebaseToken(idToken) {
  const firebaseApiKey = process.env.FIREBASE_API_KEY;
  if (!firebaseApiKey) throw new Error("FIREBASE_API_KEY environment variable is not set");

  const response = await fetch(`${FIREBASE_VERIFY_URL}${firebaseApiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data.users && data.users.length > 0 ? data.users[0] : null;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  const cors = getCorsHeaders(origin);
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const authHeader = req.headers.authorization || "";
    const idToken = authHeader.replace(/^Bearer\s+/i, "");
    if (!idToken) return res.status(401).json({ error: "Missing authorization token" });

    const user = await verifyFirebaseToken(idToken);
    if (!user) return res.status(403).json({ error: "Invalid or expired authorization token" });

    const { to, subject, html, from_email, from_name } = req.body;

    if (!to || !Array.isArray(to) || to.length === 0)
      return res.status(400).json({ error: "Missing required field: to (array of {email, name})" });
    if (!subject || !html)
      return res.status(400).json({ error: "Missing required fields: subject, html" });
    if (to.length > 10)
      return res.status(400).json({ error: "Maximum 10 recipients allowed" });

    const textContent = stripHtmlTags(html);
    const apiToken = process.env.BIVO_MLSN_API_TOKEN;
    if (!apiToken) return res.status(500).json({ error: "Email service not configured" });

    const response = await fetch(MAILERSEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiToken}` },
      body: JSON.stringify({
        from: { email: from_email || DEFAULT_FROM_EMAIL, name: from_name || DEFAULT_FROM_NAME },
        to: to.map((r) => ({ email: r.email, name: r.name || r.email })),
        subject,
        html,
        text: textContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("MailerSend API error:", response.status, errorText);
      return res.status(502).json({ error: "Failed to send email", details: errorText });
    }

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("send-email error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
