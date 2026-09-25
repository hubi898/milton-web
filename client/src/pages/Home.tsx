import { Link } from "wouter";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { assortment } from "@/data/assortment";
import { houseCallouts, rooms, type HouseRoom } from "@/data/houseCallouts";
import { useLanguage } from "@/i18n/LanguageContext";
import { publicUrl } from "@/lib/publicUrl";

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(a: number, b: number, x: number) {
  const t = clamp01((x - a) / Math.max(b - a, 0.0001));
  return t * t * (3 - 2 * t);
}

function softWindow(p: number, a: number, b: number, c: number, d: number) {
  if (p <= a || p >= d) return 0;
  if (p >= b && p <= c) return 1;
  if (p < b) return smoothstep(a, b, p);
  return 1 - smoothstep(c, d, p);
}

type Cam = { p: number; scale: number; ox: number; oy: number; tx: number; ty: number };

const CAMS: Cam[] = [
  { p: 0, scale: 0.9, ox: 50, oy: 50, tx: 0, ty: 0 },
  { p: 0.06, scale: 0.94, ox: 49, oy: 49, tx: 0, ty: 0 },
  { p: 0.16, scale: 1.18, ox: 36, oy: 43, tx: 2, ty: 2 },
  { p: 0.3, scale: 1.2, ox: 34, oy: 43, tx: 2, ty: 2 },
  { p: 0.4, scale: 1.1, ox: 36, oy: 80, tx: -2, ty: -26 },
  { p: 0.5, scale: 1.12, ox: 36, oy: 81, tx: -2, ty: -28 },
  { p: 0.62, scale: 1.14, ox: 64, oy: 60, tx: -6, ty: -2 },
  { p: 0.7, scale: 1.16, ox: 66, oy: 58, tx: -6, ty: -2 },
  { p: 0.84, scale: 0.94, ox: 50, oy: 50, tx: 0, ty: 0 },
  { p: 1, scale: 0.9, ox: 50, oy: 50, tx: 0, ty: 0 },
];

const ROOM_WINDOW: Record<HouseRoom, [number, number, number, number]> = {
  bath: [0.12, 0.18, 0.32, 0.4],
  util: [0.36, 0.42, 0.56, 0.63],
  garage: [0.58, 0.63, 0.72, 0.78],
};

function sampleCam(p: number): Cam {
  if (p <= CAMS[0].p) return CAMS[0];
  const last = CAMS[CAMS.length - 1];
  if (p >= last.p) return last;
  let i = 1;
  while (i < CAMS.length && p > CAMS[i].p) i += 1;
  const a = CAMS[i - 1];
  const b = CAMS[i];
  const t = smoothstep(a.p, b.p, p);
  return {
    p,
    scale: lerp(a.scale, b.scale, t),
    ox: lerp(a.ox, b.ox, t),
    oy: lerp(a.oy, b.oy, t),
    tx: lerp(a.tx, b.tx, t),
    ty: lerp(a.ty, b.ty, t),
  };
}

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState<HouseRoom | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let target = 0;
    let current = 0;
    let raf = 0;
    let running = true;
    let lastRoom: HouseRoom | null = null;

    const readTarget = () => {
      const start = el.offsetTop;
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      target = clamp01((window.scrollY - start) / total);
    };

    const apply = (p: number) => {
      const mobile = window.innerWidth < 760;
      const cam = sampleCam(p);
      const scale = reduce ? 0.86 : 1 + (cam.scale - 1) * (mobile ? 0.72 : 1);
      const tx = cam.tx * (mobile ? 0.4 : 1);
      const ty = cam.ty * (mobile ? 0.45 : 1);
      const zoomAmt = clamp01((scale - 0.8) / 1.0);
      const copy = reduce ? 1 : smoothstep(0.78, 0.9, p);
      const hint = reduce ? 0 : 1 - smoothstep(0, 0.08, p);
      const house = reduce ? 0.2 : 1 - smoothstep(0.8, 0.96, p) * 0.88;
      const spot = reduce ? 0 : softWindow(p, 0.08, 0.16, 0.72, 0.82);

      let active: HouseRoom | null = null;
      let best = 0;
      (Object.keys(ROOM_WINDOW) as HouseRoom[]).forEach((id) => {
        const v = softWindow(p, ...ROOM_WINDOW[id]);
        if (v > best) {
          best = v;
          active = id;
        }
        el.style.setProperty(`--room-${id}`, v.toFixed(4));
      });
      if (reduce) active = null;
      if (active !== lastRoom) {
        lastRoom = active;
        setChapter(active);
      }

      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--scale", scale.toFixed(4));
      el.style.setProperty("--ox", `${cam.ox.toFixed(2)}%`);
      el.style.setProperty("--oy", `${cam.oy.toFixed(2)}%`);
      el.style.setProperty("--tx", `${tx.toFixed(2)}%`);
      el.style.setProperty("--ty", `${ty.toFixed(2)}%`);
      el.style.setProperty("--zoom", zoomAmt.toFixed(4));
      el.style.setProperty("--spot", spot.toFixed(4));
      el.style.setProperty("--copy", copy.toFixed(4));
      el.style.setProperty("--hint", hint.toFixed(4));
      el.style.setProperty("--house", house.toFixed(4));
      el.style.setProperty("--chapter", best.toFixed(4));
    };

    const tick = () => {
      if (!running) return;
      readTarget();
      const p = reduce ? 0.92 : target;

      if (reduce) {
        current = p;
        apply(current);
        return;
      }

      const delta = target - current;
      current += delta * (Math.abs(delta) > 0.012 ? 0.28 : 0.2);
      if (Math.abs(delta) < 0.0002) current = target;
      apply(current);

      if (Math.abs(target - current) > 0.0002) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    readTarget();
    current = target;
    apply(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      running = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const chapterMeta = rooms.find((r) => r.id === chapter);

  return (
    <SiteShell headerTone="light">
      <section className="intro" aria-label={t.nav.home}>
        <div className="intro__copy">
          <img className="intro__mark" src={publicUrl("/images/milton-mark.png")} alt="MILTON" />
          <h1>
            {t.hero.h1} <span>{t.hero.h1span}</span>
          </h1>
          <p>{t.hero.lead}</p>
          <Link href="/proizvodi" className="btn btn--orange">
            {t.hero.cta} <ArrowRight size={18} />
          </Link>
        </div>
        <div className="intro__stage">
          {assortment.slice(0, 3).map((item) => (
            <Link key={item.id} href="/proizvodi" className="intro__tile">
              <img src={publicUrl(item.image)} alt={t.assortment[item.id].title} />
              <span>{t.assortment[item.id].title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="hz" ref={heroRef} aria-label={t.hero.aria}>
        <div className="hz__pin">
          <i className="hz__progress" aria-hidden />

          <div className="hz__world" aria-hidden>
            <div className="hz__frame">
              <div className="hz__media">
                <img
                  className="hz__house"
                  src={publicUrl("/images/styron-house-wide.png")}
                  alt=""
                  width={2382}
                  height={1684}
                  decoding="async"
                />
                <ul className="hz__callouts">
                  {houseCallouts.map((c, i) => (
                    <li
                      key={c.sku}
                      className={`hz__callout hz__callout--${c.side ?? "right"} hz__callout--${c.room}`}
                      style={
                        {
                          left: `${c.x}%`,
                          top: `${c.y}%`,
                          "--i": i,
                        } as CSSProperties
                      }
                    >
                      <span className="hz__anchor">
                        <span className="hz__dot" />
                      </span>
                      <span className="hz__label">
                        <span className="hz__line" aria-hidden />
                        <Link href="/proizvodi" className="hz__tag">
                          <img src={publicUrl(c.image)} alt="" />
                          <span>
                            <em>{t.hero.rooms[c.room]}</em>
                            {t.hero.pins[c.sku]}
                          </span>
                        </Link>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="hz__spot" aria-hidden />
          <div className="hz__scrim" />

          <div className="hz__chapter" aria-hidden>
            {chapterMeta && (
              <>
                <span>{chapterMeta.index} / 03</span>
                <strong>{t.hero.rooms[chapterMeta.id]}</strong>
              </>
            )}
          </div>

          <div className="hz__hint">
            <span>{t.hero.hint}</span>
            <i />
          </div>

        </div>
      </section>

      <section className="split split--tight">
        <div className="split__media">
          <img src={publicUrl("/images/styron/install.jpg")} alt={t.home.aboutImgAlt} />
        </div>
        <div className="split__copy">
          <p className="eyebrow">{t.home.aboutEyebrow}</p>
          <h2>{t.home.aboutH2}</h2>
          <p>{t.home.aboutP}</p>
          <Link href="/o-nama" className="link-arrow">
            {t.home.aboutLink} <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="cta-block">
        <div className="cta-block__inner">
          <div>
            <p className="eyebrow eyebrow--orange">{t.home.ctaEyebrow}</p>
            <h2>
              {t.home.ctaH2a}
              <br />
              {t.home.ctaH2b}
            </h2>
            <p>{t.home.ctaP}</p>
          </div>
          <div className="cta-block__actions">
            <a className="btn btn--orange" href="tel:+381244878354">
              024 / 487 8354
            </a>
            <Link href="/kontakt" className="btn btn--white">
              {t.home.ctaForm} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
