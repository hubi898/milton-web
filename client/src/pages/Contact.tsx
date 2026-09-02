import { FormEvent, useState } from "react";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/i18n/LanguageContext";

const phones = [
  { key: "central" as const, value: "024 / 487 8354", href: "tel:+381244878354" },
  { key: "fax" as const, value: "024 / 487 8088", href: "tel:+381244878088" },
  { key: "bozso" as const, value: "063 / 596 774", href: "tel:+38163596774" },
  { key: "bicskei" as const, value: "063 / 596 774", href: "tel:+38163596774" },
  { key: "makra" as const, value: "062 / 191 4265", href: "tel:+381621914265" },
];

export default function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const body = encodeURIComponent(`${t.contact.mailName}: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:milton.koko@gmail.com?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${body}`;
    setSent(true);
  };

  return (
    <SiteShell headerTone="light">
      <section className="page-hero">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h1>
          {t.contact.h1}
          <span> {t.contact.h1span}</span>
        </h1>
        <p className="page-hero__lead">{t.contact.lead}</p>
      </section>

      <section className="contact-grid">
        <form className="form-card" onSubmit={onSubmit}>
          <label>
            {t.contact.name}
            <input name="name" required placeholder={t.contact.placeholderName} />
          </label>
          <label>
            {t.contact.email}
            <input name="email" type="email" required placeholder={t.contact.placeholderEmail} />
          </label>
          <label>
            {t.contact.message}
            <textarea name="message" required rows={6} placeholder={t.contact.placeholderMessage} />
          </label>
          <button type="submit" className="btn btn--orange">
            {sent ? t.contact.sending : t.contact.send}
          </button>
        </form>

        <div className="info-stack">
          <div className="info-card">
            <h3>{t.contact.phones}</h3>
            <ul>
              {phones.map((p) => (
                <li key={p.key}>
                  <span>{t.contact.phoneLabels[p.key]}</span>
                  <a href={p.href}>{p.value}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="info-card">
            <h3>Email</h3>
            <a href="mailto:milton.koko@gmail.com">milton.koko@gmail.com</a>
          </div>
          <div className="info-card">
            <h3>{t.contact.address}</h3>
            <p>
              {t.contact.street}
              <br />
              {t.contact.city}
            </p>
            <a
              href="https://maps.google.com/?q=Pozorišna+7,+Kanjiža"
              target="_blank"
              rel="noreferrer"
              className="link-arrow"
            >
              {t.contact.map}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
