type Props = {
  items: string[];
  small?: boolean;
};

export default function Marquee({ items, small }: Props) {
  const loop = [...items, ...items];
  return (
    <div className={`marquee${small ? " marquee-small" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
