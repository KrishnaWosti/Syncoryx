import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Contact, FAQ, Footer, Process, Services, Work } from "@/components/site/Sections";
import { getDb } from "@/lib/mongodb";

export const revalidate = 0; // force dynamic rendering so edits show immediately

async function getSiteFields() {
  try {
    const db = await getDb();
    const settings = db.collection("settings");
    const fields = await settings.findOne({ key: "site_fields" });
    if (fields) {
      const { _id, key, ...data } = fields;
      return data;
    }
  } catch (error) {
    console.error("Error fetching site fields in Page:", error);
  }
  return null;
}

export default async function Home() {
  const fields = await getSiteFields();

  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <Hero fields={fields || undefined} />
        <Services />
        <Work fields={fields || undefined} />
        <Process />
        <FAQ />
        <Contact fields={fields || undefined} />
      </main>
      <Footer fields={fields || undefined} />
    </div>
  );
}
