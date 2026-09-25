import { publicUrl } from "@/lib/publicUrl";
import { useLanguage } from "@/i18n/LanguageContext";

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
  const { t } = useLanguage();
  return (
    <section className="legal">
      <p className="eyebrow">{t.legal.eyebrow}</p>
      <h1>{title}</h1>
      {sections.map((section) => (
        <article key={section.heading} className="legal__section">
          <h2>{section.heading}</h2>
          <LegalText text={section.body} />
        </article>
      ))}
      <a
        className="legal__download"
        href={publicUrl("/legal/MILTON_Legal_Documents.docx")}
        download
      >
        {t.legal.download}
      </a>
    </section>
  );
}
