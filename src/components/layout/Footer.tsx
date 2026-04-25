import { navItems } from "../../data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-row">
        <span>Sathish Kumar · Chennai, IN · ©{year}</span>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#hero" aria-label="Back to top">Back to top ↑</a>
      </div>
    </footer>
  );
}
