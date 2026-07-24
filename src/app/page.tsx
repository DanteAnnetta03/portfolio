import Navbar from "@/components/Navbar";
import WhoAmI from "@/components/WhoAmI";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <WhoAmI />
        <Achievements />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
