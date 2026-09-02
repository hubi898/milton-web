import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from "pdfjs-dist";
import { useLanguage } from "@/i18n/LanguageContext";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type Props = {
  src: string;
  title: string;
};

export default function PdfFlipbook({ src, title }: Props) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1.15);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flipping, setFlipping] = useState<"next" | "prev" | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPage(1);

    (async () => {
      try {
        const task = getDocument({ url: src, withCredentials: false });
        const pdf = await task.promise;
        if (cancelled) {
          await pdf.cleanup();
          return;
        }
        pdfRef.current = pdf;
        setPageCount(pdf.numPages);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("load");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      void pdfRef.current?.cleanup();
      pdfRef.current = null;
    };
  }, [src]);

  const renderPage = useCallback(async (pageNum: number, zoom: number) => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    if (!pdf || !canvas) return;

    const pdfPage = await pdf.getPage(pageNum);
    const viewport = pdfPage.getViewport({ scale: zoom });
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(viewport.width * dpr);
    canvas.height = Math.floor(viewport.height * dpr);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    await pdfPage.render({ canvas, canvasContext: ctx, viewport }).promise;
  }, []);

  useEffect(() => {
    if (!loading && !error && pageCount > 0) {
      void renderPage(page, scale);
    }
  }, [page, scale, loading, error, pageCount, renderPage]);

  const go = (dir: "next" | "prev") => {
    const next = dir === "next" ? page + 1 : page - 1;
    if (next < 1 || next > pageCount) return;
    setFlipping(dir);
    window.setTimeout(() => {
      setPage(next);
      setFlipping(null);
    }, 220);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go("next");
      if (e.key === "ArrowLeft") go("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (fullscreen) {
      void el.requestFullscreen?.();
    } else if (document.fullscreenElement) {
      void document.exitFullscreen?.();
    }
  }, [fullscreen]);

  useEffect(() => {
    const onFs = () => {
      if (!document.fullscreenElement) setFullscreen(false);
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  return (
    <div className={`flipbook ${fullscreen ? "flipbook--fs" : ""}`} ref={wrapRef}>
      <div className="flipbook__toolbar">
        <div className="flipbook__meta">
          <span className="eyebrow-dot" />
          <strong>{title}</strong>
          <span>{pageCount ? `${page} / ${pageCount}` : "—"}</span>
        </div>
        <div className="flipbook__actions">
          <button type="button" onClick={() => setScale((s) => Math.max(0.7, +(s - 0.15).toFixed(2)))} aria-label={t.pdf.zoomOut}>
            <ZoomOut size={16} />
          </button>
          <button type="button" onClick={() => setScale((s) => Math.min(2.2, +(s + 0.15).toFixed(2)))} aria-label={t.pdf.zoomIn}>
            <ZoomIn size={16} />
          </button>
          <button type="button" onClick={() => setFullscreen((f) => !f)} aria-label={t.pdf.fullscreen}>
            {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <a className="flipbook__download" href={src} download target="_blank" rel="noreferrer">
            <Download size={15} /> {t.pdf.download}
          </a>
        </div>
      </div>

      <div className="flipbook__stage">
        <button
          type="button"
          className="flipbook__nav flipbook__nav--prev"
          onClick={() => go("prev")}
          disabled={page <= 1 || loading}
          aria-label={t.pdf.prev}
        >
          <ChevronLeft size={22} />
        </button>

        <div
          className={`flipbook__page ${flipping === "next" ? "is-flip-next" : ""} ${flipping === "prev" ? "is-flip-prev" : ""}`}
        >
          {loading && (
            <div className="flipbook__state">
              <Loader2 className="spin" size={28} />
              <span>{t.pdf.loading}</span>
            </div>
          )}
          {error && (
            <div className="flipbook__state flipbook__state--error">
              <p>{t.pdf.loadError}</p>
              <a href={src} download>
                {t.pdf.downloadDirect}
              </a>
            </div>
          )}
          {!loading && !error && <canvas ref={canvasRef} />}
          <div className="flipbook__shade" aria-hidden />
          <div className="flipbook__corner" aria-hidden />
        </div>

        <button
          type="button"
          className="flipbook__nav flipbook__nav--next"
          onClick={() => go("next")}
          disabled={page >= pageCount || loading}
          aria-label={t.pdf.next}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="flipbook__scrub">
        <input
          type="range"
          min={1}
          max={Math.max(pageCount, 1)}
          value={page}
          disabled={!pageCount}
          onChange={(e) => setPage(Number(e.target.value))}
          aria-label={t.pdf.goto}
        />
        <p>{t.pdf.hint}</p>
      </div>
    </div>
  );
}
