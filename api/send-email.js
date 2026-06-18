// Vercel serverless function: Admin bulk email via MailerSend API
//
// Each recipient receives an INDIVIDUAL message (their address is never placed
// in a shared To header), the typed body is wrapped in the branded Bino & Vivo
// template, and a proper plain-text alternative + reply_to are included — all to
// keep deliverability high and stay out of spam folders. The client loops one
// recipient per request, but this function also handles multiple recipients with
// a small concurrency window as a safety net.
const MAILERSEND_API_URL = "https://api.mailersend.com/v1/email";
const DEFAULT_FROM_EMAIL = "info@binovivo.ca";
const DEFAULT_FROM_NAME = "Bino & Vivo";
const DEFAULT_HEADER_LABEL = "A Note From Bino & Vivo";
const DEFAULT_FOOTER_MESSAGE = "With love,";
const ALLOWED_ORIGINS = ["https://binovivo.ca", "https://www.binovivo.ca", "http://localhost:5173", "http://localhost:3000"];
const FIREBASE_VERIFY_URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SEND_CONCURRENCY = 5; // parallel /v1/email requests per batch
const MAX_RECIPIENTS = 200;

function getCorsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// ── Branded template (matches the RSVP confirmation look) ────
const EMAIL_SHELL = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{HEADER_LABEL}} — Bino &amp; Vivo</title>
  <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Josefin+Sans:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f0e8; font-family: 'Josefin Sans', Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">{{PREHEADER}}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f0e8; padding: 32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <tr>
            <td>
              <div style="background-color: #fdf9f0; border-radius: 12px; padding: 40px 36px; box-shadow: 0 2px 16px rgba(0,0,0,0.06);">
                <div style="text-align: center; margin-bottom: 32px;">
                  <h1 style="font-family: 'Pinyon Script', cursive; font-size: 42px; color: #d4b96a; margin: 0; font-weight: 400;">Bino &amp; Vivo</h1>
                  <div style="width: 80px; height: 1px; background-color: #d4b96a; margin: 12px auto;"></div>
                  <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16px; color: #999; margin: 8px 0 0 0; letter-spacing: 2px; text-transform: uppercase;">{{HEADER_LABEL}}</p>
                </div>
                <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 20px; color: #444; text-align: center; margin: 0 0 24px 0;">
                  Dear <strong>{{NAME}}</strong>,
                </p>
                <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 17px; color: #444; line-height: 1.8;">
                  {{BODY_HTML}}
                </div>
                <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #e0ddd4;">
                  <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 14px; font-style: italic; color: #6B6B6B; margin: 0 0 8px 0;">{{FOOTER_MESSAGE}}</p>
                  <p style="font-family: 'Pinyon Script', cursive; font-size: 28px; color: #d4b96a; margin: 0;">Bino &amp; Vivo</p>
                  <p style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 11px; color: #c4c4c4; margin: 16px 0 0 0; line-height: 1.6;">
                    You're receiving this because you were invited to Bino &amp; Vivo's wedding.<br>
                    To stop receiving these emails, reply with "unsubscribe".
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// ── Helpers ──────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// If body has no HTML tags, treat as plain text and convert paragraph/line breaks
function normalizeBodyHtml(raw) {
  const body = String(raw || "").trim();
  if (!body) return "";
  const hasTags = /<[a-z][\s\S]*>/i.test(body);
  if (hasTags) return body;
  return body
    .split(/\n{2,}/)
    .map((para) => `<p style="margin: 0 0 16px 0;">${escapeHtml(para).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function htmlToPlainText(html) {
  return String(html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<li>/gi, "- ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function firstName(name) {
  if (!name) return "Friend";
  const cleaned = String(name).trim().split(/\s+/)[0];
  return cleaned || "Friend";
}

function personalize(text, recipient, { escape } = { escape: false }) {
  if (!text) return "";
  const name = recipient.name || recipient.email;
  const fn = firstName(name);
  const sub = (v) => (escape ? escapeHtml(v) : v);
  return String(text)
    .replace(/\{\{\s*name\s*\}\}/gi, sub(name))
    .replace(/\{\{\s*first_name\s*\}\}/gi, sub(fn))
    .replace(/\{\{\s*email\s*\}\}/gi, sub(recipient.email));
}

function buildMessage({ recipient, subject, headerLabel, bodyHtml, footerMessage, preheader, fromEmail, fromName }) {
  const personalSubject = personalize(subject, recipient);
  const personalBodyHtml = personalize(bodyHtml, recipient, { escape: true });
  const personalBodyText = personalize(htmlToPlainText(bodyHtml), recipient);
  const greetName = escapeHtml(recipient.name || recipient.email);

  const html = EMAIL_SHELL
    .replace(/\{\{HEADER_LABEL\}\}/g, escapeHtml(headerLabel))
    .replace("{{PREHEADER}}", escapeHtml(preheader || personalSubject))
    .replace("{{NAME}}", greetName)
    .replace("{{BODY_HTML}}", personalBodyHtml)
    .replace("{{FOOTER_MESSAGE}}", escapeHtml(footerMessage));

  const text = `${headerLabel.toUpperCase()}\n\nDear ${recipient.name || recipient.email},\n\n${personalBodyText}\n\n${footerMessage}\nBino & Vivo`;

  // Note: List-Unsubscribe headers require a MailerSend Professional plan, so
  // they're omitted to keep this working on free/starter. The footer tells
  // recipients to reply with "unsubscribe" instead. reply_to improves
  // deliverability and gives guests a real address to respond to.
  return {
    from: { email: fromEmail, name: fromName },
    to: [{ email: recipient.email, name: recipient.name || undefined }],
    reply_to: { email: fromEmail, name: fromName },
    subject: personalSubject,
    html,
    text,
  };
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

    // Accept both `recipients` (admin panel) and `to` (legacy) keys.
    const {
      recipients: recipientsInput,
      to,
      subject,
      html,
      from_email,
      from_name,
      header_label,
      footer_message,
      preheader,
    } = req.body;
    const rawRecipients = recipientsInput || to;

    if (!rawRecipients || !Array.isArray(rawRecipients) || rawRecipients.length === 0)
      return res.status(400).json({ error: "Missing required field: recipients (array of {email, name})" });
    if (!subject || !html)
      return res.status(400).json({ error: "Missing required fields: subject, html" });
    if (rawRecipients.length > MAX_RECIPIENTS)
      return res.status(400).json({ error: `Maximum ${MAX_RECIPIENTS} recipients allowed` });

    const apiToken = process.env.BIVO_MLSN_API_TOKEN;
    if (!apiToken) return res.status(500).json({ error: "Email service not configured" });

    // Dedupe + validate
    const seen = new Set();
    const recipients = [];
    for (const r of rawRecipients) {
      if (!r || !r.email) continue;
      const email = String(r.email).trim();
      if (!EMAIL_REGEX.test(email)) continue;
      const key = email.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      recipients.push({ email, name: r.name ? String(r.name).trim() : "" });
    }

    if (recipients.length === 0)
      return res.status(400).json({ error: "No valid recipients" });

    const fromEmail = (from_email || DEFAULT_FROM_EMAIL).trim();
    const fromName = from_name || DEFAULT_FROM_NAME;
    const headerLabel = header_label || DEFAULT_HEADER_LABEL;
    const footerMessage = footer_message || DEFAULT_FOOTER_MESSAGE;
    const bodyHtml = normalizeBodyHtml(html);

    const messages = recipients.map((recipient) =>
      buildMessage({ recipient, subject, headerLabel, bodyHtml, footerMessage, preheader, fromEmail, fromName })
    );

    async function sendOne(message) {
      try {
        const response = await fetch(MAILERSEND_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiToken}` },
          body: JSON.stringify(message),
        });
        if (!response.ok) {
          const errText = await response.text();
          return { ok: false, email: message.to[0].email, status: response.status, error: errText };
        }
        return { ok: true, email: message.to[0].email };
      } catch (err) {
        return { ok: false, email: message.to[0].email, error: err.message };
      }
    }

    const results = [];
    for (let i = 0; i < messages.length; i += SEND_CONCURRENCY) {
      const batch = messages.slice(i, i + SEND_CONCURRENCY);
      const batchResults = await Promise.all(batch.map(sendOne));
      results.push(...batchResults);
    }

    const succeeded = results.filter((r) => r.ok);
    const failed = results.filter((r) => !r.ok);

    if (failed.length === 0) {
      return res.status(200).json({ success: true, message: `Sent ${succeeded.length} email(s) successfully` });
    }

    console.error("MailerSend send failures:", failed);
    return res.status(succeeded.length > 0 ? 207 : 502).json({
      success: succeeded.length > 0,
      message: `Sent ${succeeded.length} of ${results.length}; ${failed.length} failed`,
      failures: failed.map((f) => ({ email: f.email, status: f.status, error: f.error })),
    });
  } catch (err) {
    console.error("send-email error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
