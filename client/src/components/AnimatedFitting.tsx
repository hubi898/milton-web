import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger } from "animejs";

/**
 * Exploded / assembled view of STY-536 automata kádszifon
 * spare parts from Styron Termékkatalógus 2020–2021.
 */
export default function AnimatedFitting() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parts = Array.from(root.querySelectorAll<SVGElement>("[data-part]"));
    const labels = root.querySelectorAll<SVGElement>("[data-label]");
    const flow = root.querySelectorAll<SVGElement>("[data-flow]");

    const explodeY = [0, -52, -28, -12, 10, 34, 56, 80];
    const explodeX = [0, 10, -8, 6, -12, 16, -10, 20];

    // Ensure CSS transforms render on SVG groups
    parts.forEach((p) => {
      p.style.transformBox = "fill-box";
      p.style.transformOrigin = "center";
    });

    const tl = createTimeline({
      loop: true,
      loopDelay: 700,
      defaults: { ease: "inOutQuad" },
    });

    parts.forEach((part, i) => {
      tl.add(
        part,
        {
          translateY: explodeY[i] ?? 0,
          translateX: explodeX[i] ?? 0,
          duration: 1000,
        },
        350 + i * 65,
      );
    });

    tl.add(
      labels,
      {
        opacity: [0, 1],
        duration: 400,
        delay: stagger(50),
      },
      "-=600",
    );

    tl.add({}, { duration: 1000 });

    tl.add(labels, { opacity: 0, duration: 240 });

    Array.from(parts)
      .reverse()
      .forEach((part, i) => {
        tl.add(
          part,
          {
            translateY: 0,
            translateX: 0,
            duration: 900,
          },
          i === 0 ? "+=0" : "-=840",
        );
      });

    tl.add(
      flow,
      {
        opacity: [0, 1, 1, 0],
        duration: 1400,
        delay: stagger(70),
      },
      "-=250",
    );

    tl.add({}, { duration: 500 });

    return () => {
      tl.pause();
      animate(parts, { translateX: 0, translateY: 0, opacity: 1, duration: 0 });
      animate(labels, { opacity: 0, duration: 0 });
      animate(flow, { opacity: 0, duration: 0 });
    };
  }, []);

  return (
    <div className="fit-anim" ref={rootRef}>
      <div className="fit-anim__badge">
        <span>STYRON</span>
        <strong>STY-536-A-K</strong>
        <em>Automata kádszifon · alkatrészek</em>
      </div>

      <svg
        className="fit-anim__svg"
        viewBox="0 0 360 480"
        role="img"
        aria-label="Animált STY-536 automata kádszifon alkatrészek"
      >
        <defs>
          <linearGradient id="fitChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4f6fb" />
            <stop offset="45%" stopColor="#c5ccd8" />
            <stop offset="100%" stopColor="#8a93a6" />
          </linearGradient>
          <linearGradient id="fitBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eceff5" />
            <stop offset="100%" stopColor="#b8c0d0" />
          </linearGradient>
          <linearGradient id="fitPlastic" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f7f8fb" />
            <stop offset="100%" stopColor="#d7dce8" />
          </linearGradient>
          <linearGradient id="fitRubber" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a3f4a" />
            <stop offset="100%" stopColor="#1a1d24" />
          </linearGradient>
          <linearGradient id="fitOrange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f08018" />
            <stop offset="100%" stopColor="#ffb85c" />
          </linearGradient>
          <filter id="fitSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0b1020" floodOpacity="0.4" />
          </filter>
        </defs>

        <line
          x1="180"
          y1="36"
          x2="180"
          y2="430"
          stroke="rgba(255,255,255,0.14)"
          strokeDasharray="3 6"
        />

        <g data-part filter="url(#fitSoft)">
          <path
            d="M198 340 C250 340, 268 360, 268 390 C268 412, 248 428, 220 428"
            fill="none"
            stroke="url(#fitOrange)"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M198 340 C250 340, 268 360, 268 390 C268 412, 248 428, 220 428"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="6 8"
          />
        </g>

        <g data-part filter="url(#fitSoft)">
          <path
            d="M126 288 H234 V330 C234 352 210 368 180 368 C150 368 126 352 126 330 Z"
            fill="url(#fitPlastic)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
          />
          <ellipse cx="180" cy="288" rx="54" ry="10" fill="#dfe4ef" />
          <path d="M142 310 H218" stroke="rgba(40,48,144,0.25)" strokeWidth="2" />
        </g>

        <g data-part filter="url(#fitSoft)">
          <rect
            x="132"
            y="236"
            width="96"
            height="52"
            rx="10"
            fill="url(#fitBody)"
            stroke="rgba(255,255,255,0.45)"
          />
          <rect x="146" y="248" width="68" height="10" rx="3" fill="rgba(40,48,144,0.12)" />
          <circle cx="180" cy="268" r="8" fill="rgba(240,128,24,0.4)" />
        </g>

        <g data-part>
          <ellipse cx="180" cy="228" rx="58" ry="9" fill="url(#fitRubber)" />
          <ellipse cx="180" cy="226" rx="42" ry="5" fill="#2a2e38" />
        </g>

        <g data-part filter="url(#fitSoft)">
          <path
            d="M128 198 H232 L222 220 H138 Z"
            fill="url(#fitChrome)"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1"
          />
        </g>

        <g data-part filter="url(#fitSoft)">
          <path
            d="M148 148 H212 L226 196 H134 Z"
            fill="url(#fitChrome)"
            stroke="rgba(255,255,255,0.55)"
          />
          <ellipse cx="180" cy="148" rx="32" ry="8" fill="#eef1f7" />
        </g>

        <g data-part filter="url(#fitSoft)">
          <ellipse
            cx="180"
            cy="118"
            rx="54"
            ry="14"
            fill="url(#fitChrome)"
            stroke="rgba(255,255,255,0.65)"
          />
          <ellipse cx="180" cy="114" rx="38" ry="9" fill="#dde3ef" />
          <circle cx="180" cy="112" r="16" fill="url(#fitChrome)" stroke="rgba(40,48,144,0.2)" />
          <circle cx="180" cy="110" r="7" fill="#f08018" />
          <circle cx="180" cy="109" r="3" fill="#ffd29a" />
        </g>

        <g data-part>
          <rect x="248" y="96" width="10" height="52" rx="4" fill="url(#fitChrome)" />
          <circle cx="253" cy="92" r="8" fill="#c8d0de" stroke="rgba(255,255,255,0.5)" />
          <path
            d="M253 144 C270 160, 278 180, 274 204"
            fill="none"
            stroke="#9aa3b5"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        <g opacity="0">
          <circle data-flow cx="180" cy="200" r="3.5" fill="#7ec8ff" />
          <circle data-flow cx="180" cy="240" r="3.5" fill="#7ec8ff" />
          <circle data-flow cx="180" cy="285" r="3.5" fill="#7ec8ff" />
          <circle data-flow cx="220" cy="360" r="3.5" fill="#7ec8ff" />
          <circle data-flow cx="255" cy="400" r="3.5" fill="#7ec8ff" />
        </g>

        <g
          className="fit-anim__labels"
          fill="rgba(240,242,250,0.82)"
          fontSize="10"
          fontFamily="Manrope, sans-serif"
        >
          <g data-label opacity="0">
            <line x1="234" y1="112" x2="292" y2="78" stroke="rgba(255,255,255,0.35)" />
            <text x="296" y="76">
              S-062 takarólap
            </text>
          </g>
          <g data-label opacity="0">
            <line x1="128" y1="170" x2="56" y2="150" stroke="rgba(255,255,255,0.35)" />
            <text x="8" y="148">
              S-060 ház
            </text>
          </g>
          <g data-label opacity="0">
            <line x1="232" y1="210" x2="300" y2="210" stroke="rgba(255,255,255,0.35)" />
            <text x="304" y="213">
              S-061 anya
            </text>
          </g>
          <g data-label opacity="0">
            <line x1="122" y1="228" x2="48" y2="240" stroke="rgba(255,255,255,0.35)" />
            <text x="8" y="243">
              G-054 tömítés
            </text>
          </g>
          <g data-label opacity="0">
            <line x1="234" y1="320" x2="300" y2="330" stroke="rgba(255,255,255,0.35)" />
            <text x="304" y="333">
              bűzzár
            </text>
          </g>
          <g data-label opacity="0">
            <line x1="230" y1="400" x2="280" y2="448" stroke="rgba(255,255,255,0.35)" />
            <text x="284" y="452">
              Jolly flex
            </text>
          </g>
        </g>
      </svg>

      <p className="fit-anim__caption">
        Szétszerelés · összeszerelés — alkatrészek a 2020/21 Styron katalógusból
      </p>
    </div>
  );
}
