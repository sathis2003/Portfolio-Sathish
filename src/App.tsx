import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import About from "./components/sections/About";
import Stack from "./components/sections/Stack";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import Marquee from "./components/ui/Marquee";

const marqueeLoop = [
  "Mobile Developer",
  "Flutter · Firebase",
  "Available 2026",
  "Chennai, India",
  "Sathish Kumar",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [headerSolid, setHeaderSolid] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));

    if (reducedMotion) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const sectionObs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-20% 0px -30% 0px" },
    );

    reveals.forEach((el) => revealObs.observe(el));
    sections.forEach((el) => sectionObs.observe(el));

    return () => {
      revealObs.disconnect();
      sectionObs.disconnect();
    };
  }, [reducedMotion]);

  return (
    <div className="page">
      <Header
        activeSection={activeSection}
        menuOpen={menuOpen}
        headerSolid={headerSolid}
        onMenuToggle={() => setMenuOpen((v) => !v)}
      />
      <main>
        <Hero />
        <Work />
        <About />
        <Marquee items={marqueeLoop} />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
