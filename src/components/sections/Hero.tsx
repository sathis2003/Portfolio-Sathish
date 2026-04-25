import { ArrowUpRight, Download } from "lucide-react";
import { resumePath } from "../../data";
import portrait from "../../assets/sathish-portrait.jpg";

export default function Hero() {
  return (
    <section className="hero" id="hero" data-section>
      <div className="hero-shapes" aria-hidden="true">
        <div className="hero-shape s1" />
        <div className="hero-shape s2" />
      </div>

      <div className="shell">
        <div className="hero-grid">
          <div>
            <span className="hero-badge" data-reveal>
              <span className="pill-dot" aria-hidden="true" />
              Available for freelance &amp; full-time · 2026
            </span>

            <h1 className="hero-title" data-reveal style={{ marginTop: "clamp(14px, 2vh, 22px)" }}>
              Mobile apps <span className="serif">built</span> for the{" "}
              <span className="highlight">real world</span>.
            </h1>

            <p className="hero-sub" data-reveal style={{ marginTop: "clamp(12px, 1.8vh, 18px)" }}>
              I'm <b>Sathish Kumar</b> — a Flutter &amp; Firebase developer in Chennai.
              I design and ship production mobile apps used by real customers every day.
            </p>

            <div className="hero-actions" data-reveal style={{ marginTop: "clamp(16px, 2.2vh, 24px)" }}>
              <a className="btn btn-primary" href="#work">
                See my work
                <ArrowUpRight size={16} />
              </a>
              <a className="btn btn-ghost" href={resumePath} target="_blank" rel="noreferrer">
                <Download size={15} />
                Download resume
              </a>
            </div>
          </div>

          <div className="hero-portrait" data-reveal>
            <img src={portrait} alt="Sathish Kumar — mobile developer, smiling at a podcast recording setup" />
            <div className="hero-portrait-tag">
              <div>
                <div className="name">Sathish Kumar</div>
                <div className="sub">Mobile Developer · Chennai, IN</div>
              </div>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--pop-green)",
                boxShadow: "0 0 0 3px rgba(79, 164, 123, 0.3)",
              }} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="hero-bottom" data-reveal>
          <div className="hero-proof">
            <div className="avatars" aria-hidden="true">
              <span>SW</span>
              <span>AT</span>
              <span>AL</span>
            </div>
            <span>Trusted by teams at Scalingwolf AI, Annualr &amp; Altruisty</span>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="num">3+</span>
              <span className="label">Apps on Play Store</span>
            </div>
            <div className="hero-stat">
              <span className="num">5</span>
              <span className="label">Years mobile dev</span>
            </div>
            <div className="hero-stat">
              <span className="num">4</span>
              <span className="label">Company placements</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
