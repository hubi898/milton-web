import { FormEvent, useState } from "react";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/i18n/LanguageContext";
import { CONTACT_EMAIL, contactPhones } from "@/data/contacts";

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
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${body}`;
    setSent(true);
  };

  return (
    <SiteShell headerTone="light">
      <section className="page-hero">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h1>
          {t.contact.h1}
          {t.contact.h1span ? <span> {t.contact.h1span}</span> : null}
        </h1>
        {t.contact.lead ? <p className="page-hero__lead">{t.contact.lead}</p> : null}
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
              {contactPhones.map((p) => (
                <li key={p.key} className={p.withEmail ? "info-card__person" : undefined}>
                  <span>{t.contact.phoneLabels[p.key]}</span>
                  <div className="info-card__links">
                    <a href={p.href}>{p.value}</a>
                    {p.withEmail ? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="info-card">
            <h3>Email</h3>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
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
