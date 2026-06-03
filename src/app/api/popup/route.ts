import { getDb } from "@/lib/mongodb";

// Default popup settings if none exist in DB
const defaultPopup = {
  active: true,
  headline: "Get 30% Off",
  description: "Sign up for our newsletter and receive an exclusive 30% opening bonus on your first project with Syncoryx.",
  discount: "30%",
  buttonText: "Claim My 30% Bonus",
  placeholder: "Enter your email address",
  successMessage: "Welcome! Your 30% bonus code will be sent to your inbox.",
};

export async function GET() {
  try {
    const db = await getDb();
    const settings = db.collection("settings");

    let popup = await settings.findOne({ key: "popup" });

    if (!popup) {
      // Initialize with defaults
      await settings.insertOne({ key: "popup", ...defaultPopup });
      return Response.json(defaultPopup);
    }

    // Remove MongoDB internal fields before returning
    const { _id, key, ...popupData } = popup;
    return Response.json(popupData);
  } catch (error) {
    console.error("Popup config error:", error);
    // Return defaults even if DB fails
    return Response.json(defaultPopup);
  }
}
