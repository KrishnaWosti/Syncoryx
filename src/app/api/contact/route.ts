import { after, type NextRequest } from "next/server";
import { sendContactNotification } from "@/lib/mailer";
import { getDb } from "@/lib/mongodb";
import { contactLimits, contactTopics, type ContactField } from "@/lib/contact";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// At most this many messages from one email address inside the window.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function invalid(field: ContactField, error: string) {
  return Response.json({ error, field }, { status: 400 });
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The form could not be read. Reload and try again." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (text(body.website)) {
    return Response.json({ success: true });
  }

  const name = text(body.name);
  const email = text(body.email).toLowerCase();
  const company = text(body.company);
  const topic = text(body.topic);
  const message = text(body.message);

  if (name.length < 2) return invalid("name", "Enter your name.");
  if (name.length > contactLimits.name) return invalid("name", "That name is too long.");
  if (!emailPattern.test(email) || email.length > contactLimits.email) {
    return invalid("email", "Enter a valid email address so we can reply.");
  }
  if (company.length > contactLimits.company) {
    return invalid("company", "Keep this under " + contactLimits.company + " characters.");
  }
  if (!(contactTopics as readonly string[]).includes(topic)) {
    return invalid("topic", "Choose what you need help with.");
  }
  if (message.length < contactLimits.minMessage) {
    return invalid("message", "Tell us a little more about what you need.");
  }
  if (message.length > contactLimits.message) {
    return invalid("message", "Keep your message under " + contactLimits.message + " characters.");
  }

  const notification = { name, email, company, topic, message };

  let saved = false;
  try {
    const db = await getDb();
    const messages = db.collection("messages");

    const recent = await messages.countDocuments({
      email,
      createdAt: { $gt: new Date(Date.now() - RATE_WINDOW_MS) },
    });
    if (recent >= RATE_LIMIT) {
      return Response.json(
        { error: "You have sent several messages in a short time. Give us a moment to reply." },
        { status: 429 },
      );
    }

    await messages.insertOne({
      ...notification,
      source: "contact_form",
      createdAt: new Date(),
    });
    saved = true;
  } catch (error) {
    console.error("Contact form could not save the message:", (error as Error).message);
  }

  if (saved) {
    // The message is safe in the database, so the email alert can go out
    // after the visitor has their confirmation.
    after(() => sendContactNotification(notification));
    return Response.json({ success: true });
  }

  // The database is unreachable. The email alert is now the only way the
  // message reaches us, so wait for it before confirming.
  const emailed = await sendContactNotification(notification);
  if (emailed) {
    return Response.json({ success: true });
  }

  return Response.json(
    { error: "Your message could not be saved on our side." },
    { status: 500 },
  );
}
