import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Catalogs from "./pages/Catalogs";
import CatalogViewer from "./pages/CatalogViewer";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/o-nama" component={About} />
        <Route path="/proizvodi/:id" component={Product} />
        <Route path="/proizvodi" component={Products} />
        <Route path="/katalozi" component={Catalogs} />
        <Route path="/katalozi/:id" component={CatalogViewer} />
        <Route path="/cenovnik" component={Products} />
        <Route path="/kontakt" component={Contact} />
        <Route path="/privatnost" component={Privacy} />
        <Route path="/uslovi" component={Terms} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <WouterRouter base={routerBase}>
              <Router />
            </WouterRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
