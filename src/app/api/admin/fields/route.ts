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

// Default editable site fields
const defaultFields = {
  key: "site_fields",
  heroTagline: "Clean data. [Sharp flows.]\nMarketplace integrations that scale.",
  heroSubtitle: "We build cross-channel integrations between Shopify, eBay, Amazon, and other marketplaces — set up stores, sync inventory, manage product catalogs, and eliminate data fragmentation across channels.",
  ctaText: "Get a data + flows audit",
  contactEmail: "contact@syncoryx.agency",
  footerTagline: "Data · Flows · Integrations · Marketplace Sync",
  workSectionTitle: "Marketplace integrations that deliver real results.",
  workSectionSubtitle: "We connect Shopify to every marketplace channel — eBay, Amazon, and beyond — with integrations that drive revenue and operational clarity.",
};

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDb();
    const settings = db.collection("settings");
    let fields = await settings.findOne({ key: "site_fields" });

    if (!fields) {
      await settings.insertOne(defaultFields);
      const { key: _key, ...data } = defaultFields;
      return Response.json(data);
    }

    const { _id, key, ...data } = fields;
    return Response.json(data);
  } catch (error) {
    console.error("Admin fields GET error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const allowedFields = [
      "heroTagline",
      "heroSubtitle",
      "ctaText",
      "contactEmail",
      "footerTagline",
      "workSectionTitle",
      "workSectionSubtitle",
    ];

    const updateFields: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined && typeof body[field] === "string") {
        updateFields[field] = body[field];
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return Response.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const db = await getDb();
    const settings = db.collection("settings");

    await settings.updateOne(
      { key: "site_fields" },
      { $set: updateFields },
      { upsert: true }
    );

    return Response.json({ success: true, message: "Site fields updated" });
  } catch (error) {
    console.error("Admin fields PUT error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
