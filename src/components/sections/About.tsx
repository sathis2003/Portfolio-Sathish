import { CheckCircle2 } from "lucide-react";

const capabilities = [
  "Flutter — concept to Play Store",
  "Firebase — auth, sync, notifications, real-time data",
  "Mobile UX — components, navigation, production-grade flows",
  "Release engineering — performance, stability, store prep",
];

export default function About() {
  return (
    <section className="section" id="about" data-section>
      <div className="shell">
        <div className="section-label" data-reveal>
          <span className="num">02</span>
          <span>About</span>
        </div>

        <div className="about-card" data-reveal>
          <div className="about-grid">
            <p className="about-lede">
              I build mobile products that <span className="serif">people actually use</span> —
              not portfolio pieces. Apps that ship, stay running, and get
              opened tomorrow.
            </p>

            <div>
              <div className="about-body">
                <p>
                  Based in Chennai, currently at <strong>Scalingwolf AI</strong>,
                  building Flutter and Android apps for production teams.
                </p>
                <p>
                  Before Scalingwolf, four internships taught me the thing most
                  tutorials skip: the gap between "works on my machine" and
                  "works in production" is where most apps die. I'd rather spend
                  a week on offline states and failure modes than a day on
                  animations that won't matter.
                </p>
                <p>
                  Open to senior mobile roles and select freelance engagements —
                  typically 2–6 week Flutter / Firebase builds.
                </p>
              </div>

              <div className="about-cap">
                {capabilities.map((c) => (
                  <div className="about-cap-item" key={c}>
                    <span className="icon" aria-hidden="true">
                      <CheckCircle2 size={16} />
                    </span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
