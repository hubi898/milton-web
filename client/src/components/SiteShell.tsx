import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function SiteShell({
  children,
  headerTone = "auto",
}: {
  children: ReactNode;
  headerTone?: "auto" | "light" | "dark";
}) {
  return (
    <div className="shell">
      <SiteHeader tone={headerTone} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
