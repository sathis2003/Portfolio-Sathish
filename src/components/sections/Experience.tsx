import { ArrowUpRight } from "lucide-react";
import { credentials, experience } from "../../data";

export default function Experience() {
  return (
    <section className="section" id="experience" data-section>
      <div className="shell">
        <div className="section-label" data-reveal>
          <span className="num">04</span>
          <span>Experience</span>
        </div>

        <h2 className="section-heading" data-reveal>
          Five roles. <span className="serif">Five teams.</span> One discipline.
        </h2>

        <div className="exp-list">
          {experience.map((item) => (
            <article
              className={`exp-card${item.isCurrent ? " current" : ""}`}
              key={`${item.period}-${item.company}`}
              data-reveal
            >
              <span className="exp-period">
                {item.isCurrent && <span className="live" aria-hidden="true" />}
                {item.period}
              </span>

              <div className="exp-role">
                <h3>{item.role}</h3>
                <span className="exp-company">{item.company}</span>
              </div>

              <p className="exp-desc">{item.description}</p>

              <span className="exp-arrow" aria-hidden="true">
                <ArrowUpRight size={15} />
              </span>
            </article>
          ))}
        </div>

        <details className="creds" data-reveal>
          <summary className="creds-head">
            <span>Education &amp; Certifications</span>
            <span className="plus" aria-hidden="true">+</span>
          </summary>
          <ul className="creds-list">
            {credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
