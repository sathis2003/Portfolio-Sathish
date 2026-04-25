import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { projects, proofProjects } from "../../data";

const years: Record<string, string> = {
  "Scalingwolf AI": "2025",
  "Villza": "2024",
  "VLM – DAC HRM": "2024",
};

const AUTOPLAY_INTERVAL = 5000;

export default function Work() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const total = projects.length;
    const next = ((index % total) + total) % total;
    const cards = track.querySelectorAll<HTMLElement>(".work-card");
    const card = cards[next];
    if (!card) return;
    const offset = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left: offset, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".work-card"));
    if (!cards.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = cards.indexOf(visible.target as HTMLElement);
          if (idx >= 0) setActiveIndex(idx);
        }
      },
      { root: track, threshold: [0.55, 0.75, 0.95] },
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.3),
      { threshold: [0, 0.3, 0.6] },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying || !isInView || reducedMotion) return;
    const id = window.setInterval(() => {
      scrollToIndex(indexRef.current + 1);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(id);
  }, [isPlaying, isInView, reducedMotion, scrollToIndex]);

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < projects.length - 1;

  function handleManualNav(index: number) {
    scrollToIndex(index);
  }

  return (
    <section className="section" id="work" data-section ref={sectionRef}>
      <div className="shell">
        <div className="work-head">
          <div>
            <div className="section-label" data-reveal>
              <span className="num">01</span>
              <span>Selected work</span>
            </div>

            <h2 className="section-heading" data-reveal>
              Three products, <span className="serif">one</span> commitment —
              apps people actually open.
            </h2>
          </div>

          <div className="work-controls" data-reveal>
            <div className="work-counter">
              <span className="current">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="sep">/</span>
              <span className="total">{String(projects.length).padStart(2, "0")}</span>
            </div>
            <div className="work-arrows">
              <button
                type="button"
                className="work-arrow-btn"
                onClick={() => handleManualNav(activeIndex - 1)}
                disabled={!canPrev}
                aria-label="Previous project"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                className="work-arrow-btn work-play-btn"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
                aria-pressed={isPlaying}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button
                type="button"
                className="work-arrow-btn"
                onClick={() => handleManualNav(activeIndex + 1)}
                disabled={!canNext}
                aria-label="Next project"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="work-cards"
          ref={trackRef}
          role="region"
          aria-label="Projects carousel"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          onTouchStart={() => setIsPlaying(false)}
        >
          {projects.map((project, i) => {
            const num = String(i + 1).padStart(2, "0");
            const year = years[project.title] ?? "";
            const hasShots = Array.isArray(project.shots) && project.shots.length > 0;

            return (
              <article
                className="work-card"
                key={project.title}
                data-active={i === activeIndex ? "true" : undefined}
              >
                <div className="work-card-body">
                  <div className="work-card-head">
                    <span className="work-card-num">{num}</span>
                    <span className="work-card-type">{project.type}</span>
                    <span className="work-card-year">{year}</span>
                  </div>

                  <h3 className="work-card-title">{project.title}</h3>
                  <p className="work-card-problem">"{project.problem}"</p>
                  <p className="work-card-summary">{project.summary}</p>

                  <div className="work-card-outcome">
                    <span className="dot" aria-hidden="true" />
                    {project.outcome}
                  </div>

                  <div className="work-card-stack">
                    {project.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>

                  {project.link ? (
                    <a
                      className="work-card-cta"
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on Play Store
                      <ArrowUpRight size={15} />
                    </a>
                  ) : (
                    <span className="work-card-cta ghost">
                      Private build · not publicly listed
                    </span>
                  )}
                </div>

                <div className="work-card-visual" aria-hidden="true">
                  {hasShots ? (
                    <div className="phone-deck">
                      {project.shots!.slice(0, 3).map((src, idx) => (
                        <div className={`phone phone-${idx + 1}`} key={src}>
                          <div className="phone-screen">
                            <img src={src} alt="" loading="lazy" />
                          </div>
                          <span className="phone-notch" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="work-glyph">
                      {project.screen.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="work-foot" data-reveal>
          <div className="work-dots" role="tablist" aria-label="Project pagination">
            {projects.map((p, i) => (
              <button
                key={p.title}
                type="button"
                role="tab"
                aria-label={`Go to ${p.title}`}
                aria-selected={i === activeIndex}
                className={`work-dot${i === activeIndex ? " is-active" : ""}`}
                onClick={() => handleManualNav(i)}
                style={
                  i === activeIndex && isPlaying && isInView && !reducedMotion
                    ? ({ "--autoplay-duration": `${AUTOPLAY_INTERVAL}ms` } as React.CSSProperties)
                    : undefined
                }
              >
                {i === activeIndex && isPlaying && isInView && !reducedMotion && (
                  <span className="work-dot-fill" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>

          <div className="work-more">
            <span className="work-more-label">Also built:</span>
            <div className="work-more-items">
              {proofProjects.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
