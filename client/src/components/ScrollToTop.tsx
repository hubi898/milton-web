import { useEffect } from "react";
import { useLocation } from "wouter";

/** Scroll to top on every route change (unless a hash target is present). */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
