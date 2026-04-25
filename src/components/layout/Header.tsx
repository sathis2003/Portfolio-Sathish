import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../../data";

type Props = {
  activeSection: string;
  menuOpen: boolean;
  headerSolid: boolean;
  onMenuToggle: () => void;
};

function useChennaiClock() {
  const [time, setTime] = useState(() => formatChennaiTime());
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatChennaiTime()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function formatChennaiTime() {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(new Date());
  } catch {
    return "";
  }
}

export default function Header({ activeSection, menuOpen, headerSolid, onMenuToggle }: Props) {
  const clock = useChennaiClock();

  return (
    <>
      <header className={`site-header${headerSolid || menuOpen ? " is-solid" : ""}`}>
        <div className="shell header-row">
          <a className="brand" href="#hero" aria-label="Sathish Kumar — home">
            <span className="dot" aria-hidden="true" />
            SK / Sathish Kumar
          </a>

          <nav className="nav-primary" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "is-active" : ""}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-meta">
            <span className="status">
              <span className="status-dot" aria-hidden="true" />
              Available
            </span>
            <span className="clock" aria-label={`Chennai time ${clock}`}>
              CHN · {clock}
            </span>
          </div>

          <button
            className="menu-btn"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={onMenuToggle}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="mobile-panel">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={onMenuToggle}>
              {item.label}
            </a>
          ))}
          <div className="status">
            <span className="status-dot" aria-hidden="true" /> Available · Chennai {clock}
          </div>
        </div>
      ) : null}
    </>
  );
}
