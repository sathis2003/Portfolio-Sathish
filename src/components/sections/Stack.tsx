import { stackGroups } from "../../data";

export default function Stack() {
  return (
    <section className="section" id="stack" data-section>
      <div className="shell">
        <div className="section-label" data-reveal>
          <span className="num">03</span>
          <span>Toolkit</span>
        </div>

        <h2 className="section-heading" data-reveal>
          Tools I reach for <span className="serif">every day</span>.
        </h2>

        <div className="stack-grid">
          {stackGroups.map((group, i) => (
            <div className="stack-card" key={group.title} data-reveal>
              <span className="stack-card-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="stack-card-title">{group.title}</h3>
              <ul className="stack-items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
