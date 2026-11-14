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
    const all = await db
      .collection("messages")
      .find({})
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray();

    const messages = all.map((m) => ({
      id: String(m._id),
      name: m.name,
      email: m.email,
      company: m.company || "",
      topic: m.topic,
      message: m.message,
      createdAt: m.createdAt,
    }));

    return Response.json({ messages, total: messages.length });
  } catch (error) {
    console.error("Admin messages error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
