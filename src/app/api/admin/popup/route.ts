import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";
import { type NextRequest } from "next/server";

const SESSION_NAME = "syncoryx_admin_session";
const SESSION_VALUE = "authenticated_admin_session_v1";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_NAME);
  return session?.value === SESSION_VALUE;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDb();
    const settings = db.collection("settings");
    const popup = await settings.findOne({ key: "popup" });

    if (!popup) {
      const defaults = {
        key: "popup",
        active: true,
        headline: "Get 30% Off",
        description: "Sign up for our newsletter and receive an exclusive 30% opening bonus on your first project with Syncoryx.",
        discount: "30%",
        buttonText: "Claim My 30% Bonus",
        placeholder: "Enter your email address",
        successMessage: "Welcome! Your 30% bonus code will be sent to your inbox.",
      };
      await settings.insertOne(defaults);
      const { key, ...data } = defaults;
      return Response.json(data);
    }

    const { _id, key, ...data } = popup;
    return Response.json(data);
  } catch (error) {
    console.error("Admin popup GET error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { active, headline, description, discount, buttonText, placeholder, successMessage } = body;

    const db = await getDb();
    const settings = db.collection("settings");

    const updateFields: Record<string, unknown> = {};
    if (typeof active === "boolean") updateFields.active = active;
    if (headline) updateFields.headline = headline;
    if (description) updateFields.description = description;
    if (discount) updateFields.discount = discount;
    if (buttonText) updateFields.buttonText = buttonText;
    if (placeholder) updateFields.placeholder = placeholder;
    if (successMessage) updateFields.successMessage = successMessage;

    await settings.updateOne(
      { key: "popup" },
      { $set: updateFields },
      { upsert: true }
    );

    return Response.json({ success: true, message: "Popup settings updated" });
  } catch (error) {
    console.error("Admin popup PUT error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
