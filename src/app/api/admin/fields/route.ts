import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";
import { type NextRequest } from "next/server";
import { SITE_FIELDS_KEY, defaultSiteFields, siteFieldNames } from "@/lib/site-fields";

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
    const fields = await settings.findOne({ key: SITE_FIELDS_KEY });

    if (!fields) {
      await settings.insertOne({ key: SITE_FIELDS_KEY, ...defaultSiteFields });
      return Response.json(defaultSiteFields);
    }

    const { _id, key, ...data } = fields;
    void _id;
    void key;
    return Response.json({ ...defaultSiteFields, ...data });
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

    const updateFields: Record<string, unknown> = {};
    for (const field of siteFieldNames) {
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
      { key: SITE_FIELDS_KEY },
      { $set: updateFields },
      { upsert: true }
    );

    return Response.json({ success: true, message: "Site fields updated" });
  } catch (error) {
    console.error("Admin fields PUT error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
