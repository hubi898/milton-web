import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { team } from "@/data/team";
import { useLanguage } from "@/i18n/LanguageContext";
import { publicUrl } from "@/lib/publicUrl";

const PARTNERS = [
  { src: "/images/partner-styron.png", name: "Styron" },
  { src: "/images/partner-alca.png", name: "Alca" },
  { src: "/images/partner-arco.png", name: "Arco" },
] as const;

export default function About() {
  const { t } = useLanguage();

  return (
    <SiteShell headerTone="light">
      <section className="page-hero">
        <h1>
          {t.about.h1}
          <span> {t.about.h1span}</span>
        </h1>
        <div className="page-hero__story">
          <p>{t.about.lead}</p>
          <p>{t.about.storyP1}</p>
        </div>
      </section>

      <section className="founder-note">
        <p>{t.about.founderP1}</p>
      </section>

      <section className="usp-block">
        <h2>{t.about.whyH2}</h2>
        <ul>
          {t.about.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="partner-panel">
        <div className="partner-panel__copy">
          <h2>Styron Kft.</h2>
          <p>{t.about.partnerP1}</p>
          <p>{t.about.partnerP2}</p>
          <p>{t.about.partnerP3}</p>
          <Link href="/katalozi/styron" className="link-arrow">
            {t.about.partnerLink} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="partner-panel__media">
          <img src={publicUrl("/images/styron/shower-channel.jpg")} alt={t.about.showerAlt} />
          <img src={publicUrl("/images/styron/floor-drain.jpg")} alt={t.about.drainAlt} />
        </div>
      </section>

      <section className="logos-section">
        <h2>{t.about.partnersH2}</h2>
        <p>{t.about.p1}</p>
        <div className="logos-row">
          {PARTNERS.map((partner) => (
            <img key={partner.name} src={publicUrl(partner.src)} alt={partner.name} />
          ))}
        </div>
      </section>

      <section className="vision-block">
        <h2>{t.about.visionH2}</h2>
        <p>{t.about.visionP}</p>
      </section>

      <section className="team-block">
        <h2 className="team-block__title">{t.about.teamH2}</h2>
        <div className="team">
          {team.map((member) => {
            const copy = t.team[member.id];
            return (
              <article key={member.id}>
                <div className="team__photo">
                  {member.photo ? (
                    <img src={publicUrl(member.photo)} alt={copy.name} />
                  ) : (
                    <span className="team__avatar">{member.initials}</span>
                  )}
                </div>
                <div className="team__body">
                  <p className="team__role">{copy.role}</p>
                  <h3>{copy.name}</h3>
                  <div className="team__contact">
                    <a href={member.phoneHref}>{member.phone}</a>
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="page-bottom">
        <Link href="/kontakt" className="btn btn--orange">
          {t.nav.contact} <ArrowRight size={16} />
        </Link>
      </section>
    </SiteShell>
  );
}
