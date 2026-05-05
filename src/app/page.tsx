import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Contact, FAQ, Footer, Process, Services, Work } from "@/components/site/Sections";

export default function Home() {
  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
