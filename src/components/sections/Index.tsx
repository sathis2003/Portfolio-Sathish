const indexItems = [
  { id: "work", label: "Selected work", desc: "3 shipped products" },
  { id: "about", label: "About", desc: "Who I am, how I work" },
  { id: "stack", label: "Stack", desc: "Tools I build with" },
  { id: "experience", label: "Experience", desc: "5 years, 5 teams" },
  { id: "contact", label: "Contact", desc: "Start a conversation" },
];

export default function IndexSection() {
  return (
    <section className="section-index" data-section id="index">
      <div className="shell">
        <ul className="index-list" aria-label="Page index">
          {indexItems.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>
                <span className="num">{String(i + 1).padStart(2, "0")} /</span>
                <span className="title">{item.label}</span>
                <span className="desc">{item.desc}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
