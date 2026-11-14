import nodemailer from "nodemailer";
import { site } from "@/lib/site";

/**
 * Email alerts for contact form messages, sent over SMTP.
 *
 * Configure with environment variables (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS   the mailbox that sends the alert
 *   SMTP_FROM            optional "From" address, defaults to SMTP_USER
 *   CONTACT_NOTIFY_TO    where alerts are delivered, defaults to the site contact email
 *
 * If SMTP_HOST is not set, alerts are skipped and messages are still saved
 * to the database and shown in /admin.
 */

export type ContactNotification = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST);
}

/** Keeps user input out of mail headers. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sends the alert. Resolves to true when the mail server accepted it,
 * false when mail is not configured or sending failed. Never throws.
 */
export async function sendContactNotification(msg: ContactNotification): Promise<boolean> {
  if (!isMailConfigured()) return false;

  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user || site.email;
  const to = process.env.CONTACT_NOTIFY_TO || site.email;

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: user && pass ? { user, pass } : undefined,
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });

    const name = headerSafe(msg.name);
    const company = headerSafe(msg.company);
    const lines = [
      "New message from the " + site.name + " contact form",
      "",
      "Name:    " + name,
      "Email:   " + msg.email,
      "Company: " + (company || "(not given)"),
      "Topic:   " + msg.topic,
      "",
      msg.message,
      "",
      "Reply to this email to answer " + name + " directly.",
    ];

    const html =
      '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#0b0e1a">' +
      "<p><strong>New message from the " +
      escapeHtml(site.name) +
      " contact form</strong></p>" +
      '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">' +
      [
        ["Name", name],
        ["Email", msg.email],
        ["Company", company || "(not given)"],
        ["Topic", msg.topic],
      ]
        .map(
          ([label, value]) =>
            '<tr><td style="padding:2px 16px 2px 0;color:#677087">' +
            label +
            "</td><td>" +
            escapeHtml(value) +
            "</td></tr>",
        )
        .join("") +
      "</table>" +
      '<p style="white-space:pre-wrap;border-left:3px solid #2b39ee;padding-left:12px;margin:18px 0">' +
      escapeHtml(msg.message) +
      "</p>" +
      '<p style="color:#677087">Reply to this email to answer ' +
      escapeHtml(name) +
      " directly.</p></div>";

    await transport.sendMail({
      from: { name: site.name + " website", address: from },
      to,
      replyTo: { name, address: msg.email },
      subject: headerSafe("New contact message: " + msg.topic + " (" + name + ")"),
      text: lines.join("\n"),
      html,
    });
    return true;
  } catch (error) {
    console.error("Contact notification email failed:", (error as Error).message);
    return false;
  }
}
