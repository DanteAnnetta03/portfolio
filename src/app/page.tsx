import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoAmI from "@/components/WhoAmI";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <Hero />
      {/* Below 2xl: single column, sections stacked in document order (each
          self-centers via its own max-w-6xl). At 2xl+ ("ventana lo
          suficientemente ancha"): two columns side by side — profile +
          achievements on the left, projects on the right — so both tracks
          are visible together instead of one long single-column scroll. */}
      <main className="flex-1 2xl:mx-auto 2xl:grid 2xl:max-w-[2368px] 2xl:grid-cols-2 2xl:items-start 2xl:gap-x-8">
        <div>
          <WhoAmI />
          <Achievements />
        </div>
        <div className="2xl:border-l 2xl:border-line 2xl:pl-8">
          <Projects />
        </div>
      </main>
      <Footer />
    </div>
  );
}
