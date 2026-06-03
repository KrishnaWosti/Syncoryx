import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";

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
    const subscribers = db.collection("subscribers");

    const allSubscribers = await subscribers
      .find({})
      .sort({ subscribedAt: -1 })
      .toArray();

    const sanitized = allSubscribers.map((s) => ({
      email: s.email,
      subscribedAt: s.subscribedAt,
      source: s.source || "unknown",
    }));

    return Response.json({ subscribers: sanitized, total: sanitized.length });
  } catch (error) {
    console.error("Admin subscribers error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
