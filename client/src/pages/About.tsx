import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { team } from "@/data/team";
import { useLanguage } from "@/i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <SiteShell headerTone="light">
      <section className="page-hero">
        <h1>
          {t.about.h1}
          <span> {t.about.h1span}</span>
        </h1>
        <p className="page-hero__lead">{t.about.lead}</p>
      </section>

      <section className="story-plain">
        <h2>{t.about.storyH2}</h2>
        <p>{t.about.storyP1}</p>
      </section>

      <section className="founder-note">
        <h2>{t.about.founderName}</h2>
        <p>{t.about.founderP1}</p>
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
                    <img src={member.photo} alt={copy.name} />
                  ) : (
                    <span className="team__avatar">{member.initials}</span>
                  )}
                </div>
                <div className="team__body">
                  <p className="team__role">{copy.role}</p>
                  <h3>{copy.name}</h3>
                  <p className="team__focus">{copy.focus}</p>
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
