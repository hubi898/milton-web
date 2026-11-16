const LEGAL_MAIL = "info@milton.rs";

function LegalText({ text }: { text: string }) {
  const parts = text.split(new RegExp(`(${LEGAL_MAIL})`, "g"));
  return (
    <p>
      {parts.map((part, i) =>
        part === LEGAL_MAIL ? (
          <a key={i} href={`mailto:${LEGAL_MAIL}`}>
            {LEGAL_MAIL}
          </a>
        ) : (
          part
        ),
      )}
    </p>
  );
}

export default function LegalDoc({
  title,
  sections,
}: {
  title: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <section className="legal">
      <h1>{title}</h1>
      {sections.map((section) => (
        <article key={section.heading} className="legal__section">
          <h2>{section.heading}</h2>
          <LegalText text={section.body} />
        </article>
      ))}
    </section>
  );
}
