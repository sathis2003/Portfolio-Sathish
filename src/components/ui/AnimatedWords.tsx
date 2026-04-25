import { type CSSProperties } from "react";

export default function AnimatedWords({ as, text }: { as: "h2" | "h3"; text: string }) {
  const Tag = as;
  return (
    <Tag className="section-title" aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          className="word"
          key={`${word}-${i}`}
          style={{ "--word-delay": `${i * 0.07}s` } as CSSProperties}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
