import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { team } from "@/data/team";
import { useLanguage } from "@/i18n/LanguageContext";
import { publicUrl } from "@/lib/publicUrl";

export default function About() {
  const { t } = useLanguage();

  return (
    <SiteShell headerTone="light">
      <section className="page-hero">
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h1>
          {t.about.h1}
          <span> {t.about.h1span}</span>
        </h1>
        <p className="page-hero__lead">{t.about.lead}</p>
      </section>

      <section className="media-bleed">
        <img src={publicUrl("/images/styron/install.jpg")} alt={t.about.bleedAlt} />
        <div className="media-bleed__chip">
          <strong>Pozorišna 7</strong>
          <span>{t.about.city}</span>
        </div>
      </section>

      <section className="stat-strip" aria-label={t.about.statsAria}>
        {t.about.stats.map((s) => (
          <article key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </article>
        ))}
      </section>

      <section className="prose-block">
        <blockquote>{t.about.quote}</blockquote>
        <div className="prose-block__cols">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>
      </section>

      <section className="partner-panel">
        <div className="partner-panel__copy">
          <p className="eyebrow">{t.about.partnerEyebrow}</p>
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

      <section className="iso-note">
        <p>{t.about.iso}</p>
      </section>

      <section className="usp-block">
        <p className="eyebrow">{t.about.whyEyebrow}</p>
        <h2>{t.about.whyH2}</h2>
        <ul>
          {t.about.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="story-block">
        <div className="story-block__media">
          <img src={publicUrl("/images/styron/faucet.jpg")} alt={t.about.faucetAlt} />
        </div>
        <div className="story-block__copy">
          <p className="eyebrow">{t.about.storyEyebrow}</p>
          <h2>{t.about.storyH2}</h2>
          <p>{t.about.storyP1}</p>
          <p>{t.about.storyP2}</p>
          <p>{t.about.storyP3}</p>
        </div>
      </section>

      <section className="founder-grid">
        <article>
          <p className="eyebrow">{t.about.founderEyebrow}</p>
          <h2>{t.about.founderName}</h2>
          <p>{t.about.founderP1}</p>
          <p>{t.about.founderP2}</p>
        </article>
        <article>
          <p className="eyebrow eyebrow--orange">{t.about.visionEyebrow}</p>
          <h2>{t.about.visionH2}</h2>
          <p>{t.about.visionP}</p>
          <ul>
            {t.about.visionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="team-block">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t.about.teamEyebrow}</p>
            <h2>{t.about.teamH2}</h2>
            <p className="section__lead">{t.about.teamLead}</p>
          </div>
        </div>
        <div className="team">
          {team.map((member) => {
            const copy = t.team[member.id];
            return (
              <article key={member.id}>
                <div className="team__photo">
                  {member.photo ? (
                    <img src={member.photo} alt={copy.name} />
                  ) : (
                    <span className="team__avatar">{member.initials}</span>
                  )}
                </div>
                <div className="team__body">
                  <p className="team__role">{copy.role}</p>
                  <h3>{copy.name}</h3>
                  <p className="team__focus">{copy.focus}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="page-bottom">
        <Link href="/katalozi" className="btn btn--blue">
          {t.about.ctaCatalogs} <ArrowRight size={16} />
        </Link>
      </section>
    </SiteShell>
  );
}
