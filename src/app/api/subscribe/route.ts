import { getDb } from "@/lib/mongodb";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    const db = await getDb();
    const subscribers = db.collection("subscribers");

    // Check for duplicate
    const existing = await subscribers.findOne({ email: email.toLowerCase() });
    if (existing) {
      return Response.json({ message: "Already subscribed!", success: true });
    }

    await subscribers.insertOne({
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      source: "popup_30_bonus",
    });

    return Response.json({ message: "Successfully subscribed!", success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
