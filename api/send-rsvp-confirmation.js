// Vercel serverless function: Send RSVP confirmation emails via MailerSend API
const MAILERSEND_API_URL = "https://api.mailersend.com/v1/email";
const FROM_EMAIL = "info@binovivo.ca";
const FROM_NAME = "Bino & Vivo";
const ALLOWED_ORIGINS = ["https://binovivo.ca", "https://www.binovivo.ca", "http://localhost:5173", "http://localhost:3000"];
const ALLOWED_STATUSES = ["Joyfully Accepts", "Regretfully Declines"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WEDDING_DATE = "August 30, 2026";
const WEDDING_TIME = "3:00 PM";
const WEDDING_END_TIME = "11:00 PM";
const WEDDING_VENUE = "The Botanical Garden Estate";
const WEDDING_ADDRESS = "123 Garden Lane";
const DRESS_CODE = "Garden Formal";

const GOOGLE_CAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Bino+%26+Vivo%27s+Wedding" +
  "&dates=20260830T190000Z/20260831T030000Z" +
  "&details=Join+us+for+the+wedding+celebration+of+Bino+%26+Vivo" +
  "&location=The+Botanical+Garden+Estate%2C+123+Garden+Lane" +
  "&sf=true&output=xml";

const ICS_CONTENT = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Bino & Vivo//Wedding//EN",
  "CALSCALE:GREGORIAN",
  "METHOD:PUBLISH",
  "BEGIN:VTIMEZONE",
  "TZID:America/Toronto",
  "BEGIN:DAYLIGHT",
  "DTSTART:20260308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "TZOFFSETFROM:-0500",
  "TZOFFSETTO:-0400",
  "TZNAME:EDT",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "DTSTART:20261101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "TZOFFSETFROM:-0400",
  "TZOFFSETTO:-0500",
  "TZNAME:EST",
  "END:STANDARD",
  "END:VTIMEZONE",
  "BEGIN:VEVENT",
  "DTSTART;TZID=America/Toronto:20260830T150000",
  "DTEND;TZID=America/Toronto:20260830T230000",
  "SUMMARY:Bino & Vivo's Wedding",
  "DESCRIPTION:Join us for the wedding celebration of Bino & Vivo",
  "LOCATION:The Botanical Garden Estate\\, 123 Garden Lane",
  "STATUS:CONFIRMED",
  "SEQUENCE:0",
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

const ICS_BASE64 = Buffer.from(ICS_CONTENT).toString("base64");

function getCorsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtmlEmail({ name, status, attendingMembers, declinedMembers, isUpdate }) {
  const isAccepting = status === "Joyfully Accepts";

  const attendingList =
    attendingMembers && attendingMembers.length > 0
      ? `<div style="margin: 20px 0;">
          <h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; color: #5a7a57; margin-bottom: 8px;">Attending</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${attendingMembers.map((m) => `<li style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 15px; color: #555; padding: 4px 0; padding-left: 16px; position: relative;"><span style="position: absolute; left: 0; color: #8faa8c;">&#10003;</span>${escapeHtml(m)}</li>`).join("")}
          </ul>
        </div>`
      : "";

  const declinedList =
    declinedMembers && declinedMembers.length > 0
      ? `<div style="margin: 20px 0;">
          <h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; color: #a08080; margin-bottom: 8px;">Unable to Attend</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${declinedMembers.map((m) => `<li style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 15px; color: #999; padding: 4px 0; padding-left: 16px;">${escapeHtml(m)}</li>`).join("")}
          </ul>
        </div>`
      : "";

  const eventDetailsSection = isAccepting
    ? `<div style="background-color: #ffffff; border: 1px solid #e0ddd4; border-radius: 12px; padding: 28px; margin: 28px 0; text-align: center;">
          <h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; color: #5a7a57; margin: 0 0 16px 0;">Event Details</h3>
          <table style="margin: 0 auto; text-align: left; font-family: 'Josefin Sans', Arial, sans-serif; font-size: 15px; color: #555;">
            <tr><td style="padding: 6px 16px 6px 0; font-weight: 600; color: #7ba7c2;">Date</td><td style="padding: 6px 0;">${WEDDING_DATE}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; font-weight: 600; color: #7ba7c2;">Time</td><td style="padding: 6px 0;">${WEDDING_TIME}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; font-weight: 600; color: #7ba7c2;">Venue</td><td style="padding: 6px 0;">${WEDDING_VENUE}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; font-weight: 600; color: #7ba7c2;">Address</td><td style="padding: 6px 0;">${WEDDING_ADDRESS}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; font-weight: 600; color: #7ba7c2;">Dress Code</td><td style="padding: 6px 0;">${DRESS_CODE}</td></tr>
          </table>
          <div style="margin-top: 24px;">
            <a href="${GOOGLE_CAL_URL}" target="_blank" style="display: inline-block; background-color: #8faa8c; color: #ffffff; font-family: 'Josefin Sans', Arial, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; padding: 10px 24px; border-radius: 6px; margin: 4px 8px;">Add to Google Calendar</a>
            <a href="https://binovivo.ca/wedding.ics" style="display: inline-block; background-color: #7ba7c2; color: #ffffff; font-family: 'Josefin Sans', Arial, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; padding: 10px 24px; border-radius: 6px; margin: 4px 8px;">Add to Apple Calendar</a>
          </div>
        </div>`
    : "";

  const statusColor = isAccepting ? "#8faa8c" : "#a08080";
  const statusEmoji = isAccepting ? "&#127881;" : "&#128140;";
  const updateBanner = isUpdate
    ? `<div style="background-color: #d4b96a; color: #ffffff; font-family: 'Josefin Sans', Arial, sans-serif; font-size: 13px; text-align: center; padding: 8px; border-radius: 8px 8px 0 0; letter-spacing: 1px;">RSVP UPDATED</div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Josefin+Sans:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f0e8; font-family: 'Josefin Sans', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f0e8; padding: 32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <tr>
            <td>
              ${updateBanner}
              <div style="background-color: #fdf9f0; border-radius: ${isUpdate ? "0 0 12px 12px" : "12px"}; padding: 40px 36px; box-shadow: 0 2px 16px rgba(0,0,0,0.06);">
                <div style="text-align: center; margin-bottom: 32px;">
                  <h1 style="font-family: 'Pinyon Script', cursive; font-size: 42px; color: #d4b96a; margin: 0; font-weight: 400;">Bino &amp; Vivo</h1>
                  <div style="width: 80px; height: 1px; background-color: #d4b96a; margin: 12px auto;"></div>
                  <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16px; color: #999; margin: 8px 0 0 0; letter-spacing: 2px; text-transform: uppercase;">RSVP Confirmation</p>
                </div>
                <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 20px; color: #444; text-align: center; margin: 0 0 24px 0;">
                  Dear <strong>${escapeHtml(name)}</strong>,
                </p>
                <div style="background-color: #f9f6ef; border-left: 4px solid ${statusColor}; border-radius: 0 8px 8px 0; padding: 20px 24px; margin: 0 0 24px 0; text-align: center;">
                  <p style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 14px; color: #888; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 1px;">Your Response</p>
                  <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 26px; color: ${statusColor}; margin: 0; font-weight: 600;">
                    ${statusEmoji} ${status}
                  </p>
                </div>
                ${attendingList}
                ${declinedList}
                ${eventDetailsSection}
                ${isAccepting ? `<p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; color: #555; text-align: center; margin: 28px 0 0 0; font-style: italic;">We are so excited to celebrate with you!</p>` : `<p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; color: #555; text-align: center; margin: 28px 0 0 0; font-style: italic;">We will miss you dearly and wish you all the best.</p>`}
                <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #e0ddd4;">
                  <p style="font-family: 'Pinyon Script', cursive; font-size: 28px; color: #d4b96a; margin: 0;">Bino &amp; Vivo</p>
                  <p style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 12px; color: #bbb; margin: 8px 0 0 0;">${WEDDING_DATE}</p>
                  <p style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 11px; color: #ccc; margin: 12px 0 0 0;">
                    If you need to update your RSVP, please visit <a href="https://binovivo.ca" style="color: #7ba7c2; text-decoration: none;">binovivo.ca</a>
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
}

function buildPlainText({ name, status, attendingMembers, declinedMembers, isUpdate }) {
  const isAccepting = status === "Joyfully Accepts";
  let text = "";
  if (isUpdate) text += "--- RSVP UPDATED ---\n\n";
  text += "Bino & Vivo\nRSVP Confirmation\n========================\n\n";
  text += `Dear ${name},\n\nYour Response: ${status}\n\n`;
  if (attendingMembers && attendingMembers.length > 0) {
    text += "Attending:\n";
    attendingMembers.forEach((m) => (text += `  - ${m}\n`));
    text += "\n";
  }
  if (declinedMembers && declinedMembers.length > 0) {
    text += "Unable to Attend:\n";
    declinedMembers.forEach((m) => (text += `  - ${m}\n`));
    text += "\n";
  }
  if (isAccepting) {
    text += `Event Details:\n  Date: ${WEDDING_DATE}\n  Time: ${WEDDING_TIME}\n  Venue: ${WEDDING_VENUE}\n  Address: ${WEDDING_ADDRESS}\n  Dress Code: ${DRESS_CODE}\n\n`;
    text += `Add to Google Calendar: ${GOOGLE_CAL_URL}\nAdd to Apple Calendar: https://binovivo.ca/wedding.ics\n\n`;
    text += "We are so excited to celebrate with you!\n\n";
  } else {
    text += "We will miss you dearly and wish you all the best.\n\n";
  }
  text += "------------------------\nBino & Vivo\n" + WEDDING_DATE + "\nVisit: https://binovivo.ca\n";
  return text;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  const cors = getCorsHeaders(origin);
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, status, attendingMembers = [], declinedMembers = [], emails, isUpdate = false } = req.body;

    if (!name || !status || !emails || !Array.isArray(emails))
      return res.status(400).json({ error: "Missing required fields: name, status, emails" });
    if (!ALLOWED_STATUSES.includes(status))
      return res.status(400).json({ error: `Invalid status. Allowed: ${ALLOWED_STATUSES.join(", ")}` });
    if (name.length > 100)
      return res.status(400).json({ error: "Name must be 100 characters or less" });
    if (emails.length === 0 || emails.length > 10)
      return res.status(400).json({ error: "Must have between 1 and 10 email recipients" });
    for (const r of emails) {
      if (!r.email || !EMAIL_REGEX.test(r.email))
        return res.status(400).json({ error: `Invalid email address: ${r.email}` });
    }
    if (attendingMembers.length > 20 || declinedMembers.length > 20)
      return res.status(400).json({ error: "Maximum 20 members per list" });

    const htmlContent = buildHtmlEmail({ name, status, attendingMembers, declinedMembers, isUpdate });
    const textContent = buildPlainText({ name, status, attendingMembers, declinedMembers, isUpdate });
    const subjectPrefix = isUpdate ? "Updated RSVP" : "RSVP Confirmation";

    const apiToken = process.env.BIVO_MLSN_API_TOKEN;
    if (!apiToken) return res.status(500).json({ error: "Email service not configured" });

    const response = await fetch(MAILERSEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiToken}` },
      body: JSON.stringify({
        from: { email: FROM_EMAIL, name: FROM_NAME },
        to: emails.map((r) => ({ email: r.email, name: r.name || r.email })),
        subject: `${subjectPrefix} - Bino & Vivo's Wedding`,
        html: htmlContent,
        text: textContent,
        attachments: [{ filename: "wedding.ics", content: ICS_BASE64, type: "text/calendar" }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("MailerSend API error:", response.status, errorText);
      return res.status(502).json({ error: "Failed to send email", details: errorText });
    }

    return res.status(200).json({ message: "RSVP confirmation email sent successfully" });
  } catch (err) {
    console.error("send-rsvp-confirmation error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
