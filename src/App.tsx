import { useEffect, useState } from "react";
import { Routes, Route, NavLink, useLocation, useParams, useNavigate, Navigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "./theme/theme";
import { useWorldStore } from "./store/worldStore";
import { WorldThemeSync } from "./components/WorldThemeSync";
import { WorldHeader } from "./components/WorldHeader";
import { ShellNav } from "./components/ShellNav";
import { HomePage } from "./pages/HomePage";
import { CharacterListPage } from "./pages/CharacterListPage";
import { LocationListPage } from "./pages/LocationListPage";
import { ConnectionsPage } from "./pages/ConnectionsPage";
import { GraphPage } from "./pages/GraphPage";
import { TimelinePage } from "./pages/TimelinePage";
import { FactionListPage } from "./pages/FactionListPage";
import { CreateWorldPage } from "./pages/CreateWorldPage";
import AllEntitiesPage from "./pages/AllEntitiesPage";
import { CharacterEditorPage } from "./pages/CharacterEditorPage";
import ViewCharacterPage from "./pages/ViewCharacterPage";

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const { theme } = useTheme();
  const { worldId } = useParams<{ worldId: string }>();
  const selectedWorldId = worldId ?? useWorldStore((s) => s.currentWorldId);
  const linkClasses = ({ isActive }: { isActive: boolean }) => {
    if (theme.shape.pillNav) {
      return `rounded-full px-3 py-1 font-body transition-colors ${isActive ? "bg-accent-primary text-bg-base" : "text-text-secondary"}`;
    }
    return `border-l-2 px-1 py-1 font-body transition-colors ${isActive ? "border-accent-primary text-text-primary" : "border-transparent text-text-secondary"}`;
  };

  return (
    <nav className="flex flex-col gap-2 px-4 py-4 text-sm ">
      <p
        className={`text-[10px] tracking-[0.2em] uppercase font-body font-light ${theme.id === "literary-historical" ? "text-accent-primary" : "text-text-primary"}`}
      >
        {theme.id === "dark-fantasy" && "Dominion"}
        {theme.id === "romance" && "Story"}
        {theme.id === "literary-historical" && "Overview"}
      </p>
      <NavLink to={selectedWorldId ? `/world/${selectedWorldId}/all` : "/"} className={linkClasses} onClick={() => onNavigate?.()}>
        All Entities
      </NavLink>
      <NavLink to={selectedWorldId ? `/world/${selectedWorldId}/connections` : "/"} className={linkClasses} onClick={() => onNavigate?.()}>
        {theme.vocabulary.connectionsLabel}
      </NavLink>
      <NavLink to={selectedWorldId ? `/world/${selectedWorldId}/timeline` : "/"} className={linkClasses} onClick={() => onNavigate?.()}>
        {theme.vocabulary.timelineLabel}
      </NavLink>

      <p
        className={`text-[10px] tracking-[0.2em] border-t pt-4  uppercase font-body font-light  ${theme.id === "literary-historical" ? "text-accent-primary border-accent-primary" : "text-text-primary border-border"}`}
      >
        {theme.id === "dark-fantasy" && "Codex"}
        {theme.id === "romance" && "Registry"}
        {theme.id === "literary-historical" && "Register"}
      </p>
      <NavLink to={selectedWorldId ? `/world/${selectedWorldId}/characters` : "/"} className={linkClasses} onClick={() => onNavigate?.()}>
        {theme.vocabulary.entityLabelsPlural.character}
      </NavLink>
      <NavLink to={selectedWorldId ? `/world/${selectedWorldId}/locations` : "/"} className={linkClasses} onClick={() => onNavigate?.()}>
        {theme.vocabulary.entityLabelsPlural.location}
      </NavLink>
      <NavLink to={selectedWorldId ? `/world/${selectedWorldId}/factions` : "/"} className={linkClasses} onClick={() => onNavigate?.()}>
        {theme.vocabulary.entityLabelsPlural.faction}
      </NavLink>

      <NavLink to={selectedWorldId ? `/world/${selectedWorldId}/graph` : "/"} className={linkClasses} onClick={() => onNavigate?.()}>
        {theme.vocabulary.graphLabel}
      </NavLink>
    </nav>
  );
}

// function ThemeSwitcher() {
//   const { setThemeId } = useTheme();
//   const ids = Object.keys(themes) as ThemeId[];
//   return (
//     <div className="flex gap-2 px-8 pt-4">
//       {ids.map((id) => (
//         <button key={id} onClick={() => setThemeId(id)} className="rounded-md border border-border bg-bg-surface px-3 py-1.5 text-text-primary">
//           {themes[id].name}
//         </button>
//       ))}
//     </div>
//   );
// }
function WorldShell() {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { worldId } = useParams<{ worldId: string }>();
  const worlds = useWorldStore((s) => s.worlds);
  const setCurrentWorldId = useWorldStore((s) => s.setCurrentWorldId);
  const currentWorldId = worldId ?? useWorldStore((s) => s.currentWorldId);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
 

  useEffect(() => {
    if (!worldId) return;
    if (worlds.length && !worlds.some((w) => w.id === worldId)) {
      navigate(`/world/${worlds[0].id}/all`, { replace: true });
      return;
    }
    setCurrentWorldId(worldId);
  }, [worldId, worlds, navigate, setCurrentWorldId]);

  const hideSidebar = /\/world\/[^/]+\/characters\//.test(location.pathname) && 
  !/\/world\/[^/]+\/characters\/view\//.test(location.pathname) && 
  !window.matchMedia("(max-width: 768px)").matches;
  return (
    <>
      <WorldThemeSync />

      <div
        className={`grid min-h-screen ${hideSidebar ? "grid-cols-1" : "md:grid-cols-[210px_1fr]"} grid-rows-[auto_1fr] `}
      >
        {!hideSidebar && (
          <>
          <div
              className={`fixed inset-0 z-30 bg-black/60 transition-opacity md:hidden ${mobileSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
              onClick={() => setMobileSidebarOpen(false)}
            />
          <section
            className={`sidebar flex z-40 flex-col h-screen transform transition-transform duration-200 md:static md:translate-x-0 md:flex ${theme.id === "romance" ? "border-t-4 border-accent-primary" : theme.id === "literary-historical" ? "border-t-4 border-accent-primary" : ""} ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <WorldHeader />
            <Nav onNavigate={() => setMobileSidebarOpen(false)} />
          </section>
          </>
        )}
        <main
          className={`border-l ${theme.id === "literary-historical" ? " border-l-4 border-accent-primary" : "border-border"}`}
        >
          <div className="flex sticky top-0 items-center gap-3 border-b border-border/70 px-4 py-3 md:hidden">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-surface text-sm text-text-primary"
                aria-label="Open navigation"
              >
                ☰
              </button>
              <span className="text-sm font-body uppercase tracking-[0.2em] text-text-secondary">
                Navigation
              </span>
            </div>
          <Routes>
            <Route index element={<Navigate to="all" replace />} />
            <Route path="all" element={<AllEntitiesPage />} />
            <Route path="characters" element={<CharacterListPage />} />
            <Route path="locations" element={<LocationListPage />} />
            <Route path="connections" element={<ConnectionsPage />} />
            <Route path="graph" element={<GraphPage />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="factions" element={<FactionListPage />} />
            <Route path="characters/new" element={<CharacterEditorPage />} />
            <Route path="characters/:id" element={<CharacterEditorPage />} />
            <Route path="characters/view/:id" element={<ViewCharacterPage />} />
            <Route path="*" element={<AllEntitiesPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default function App() {
  const loadWorlds = useWorldStore((s) => s.loadWorlds);

  useEffect(() => {
    loadWorlds();
  }, [loadWorlds]);

  return (
    <ThemeProvider initialThemeId="dark-fantasy">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ShellNav />
              <HomePage />
            </>
          }
        />
        <Route path="/world/:worldId/*" element={<WorldShell />} />
        <Route path="/world" element={<Navigate to="/" replace />} />
        <Route path="/create" element={<CreateWorldPage />} />
      </Routes>
    </ThemeProvider>
  );
}
