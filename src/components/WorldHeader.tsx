import { useState, type FormEvent } from "react";
import { useTheme, themes } from "../theme/theme";
import { useWorldStore } from "../store/worldStore";
import type { ThemeId } from "../types/entities";
import { IconSword } from "@tabler/icons-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export function WorldHeader() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {
    worlds,
    currentWorldId,
    setCurrentWorldId,
    createWorld,
    setWorldTheme,
  } = useWorldStore();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [newWorldTheme, setNewWorldTheme] = useState<ThemeId>("dark-fantasy");

  const { worldId } = useParams<{ worldId: string }>();
  const location = useLocation();
  const currentWorld = worlds.find((w) => w.id === currentWorldId);
  const themeIds = Object.keys(themes) as ThemeId[];

  //   async function handleCreate(e: FormEvent) {
  //     e.preventDefault();
  //     if (!name.trim()) return;
  //     await createWorld(name.trim(), newWorldTheme);
  //     setName('');
  //     setShowForm(false);
  //   }

  return (
    <div className="flex flex-col  justify-between gap-2 bg-bg-surface  pt-4">
      <div className="flex flex-col gap-2">
        <div className="px-4 pb-2">
          <div
            onClick={() => navigate("/")}
            className="flex flex-col gap-2.5 cursor-pointer"
          >
            <div className="flex h-6.5 w-6.5 items-center justify-center border border-border text-white/50">
              <IconSword size={13} />
            </div>
            <span
              className={`font-display text-lg tracking-[0.12em] text-text-primary ${theme.id === "literary-historical" ? "text-white" : ""}`}
            >
              Loresmith
            </span>
          </div>
          <p
            className={`text-xs  font-light tracking-widest ${theme.id !== "dark-fantasy" ? "uppercase text-[10px]" : "italic"} ${theme.id === "literary-historical" ? "text-accent-primary" : " text-text-secondary"} `}
          >
            {theme.vocabulary.worldSubtitle}
          </p>
        </div>
        <hr
          className={`${theme.id === "literary-historical" ? "border-accent-primary" : " border-border"}`}
        />
        <div
          className={`px-2  relative py-2 mx-3 my-2 border  bg-bg-surface-alt rounded-sm ${theme.id === "dark-fantasy" ? "border-border before:content-[''] before:absolute before:inset-0.75 before:border before:border-[rgba(200,169,110,0.06)] before:pointer-events-none" : theme.id === "literary-historical" ? "bg-bg-surface-alt/5 border-accent-primary/35" : "border-border"} `}
        >
          <p
            className={`pl-1 text-[10px] uppercase tracking-widest ${theme.id === "literary-historical" ? "text-accent-primary" : "text-text-secondary "} `}
          >
            Active {theme.vocabulary.worldLabel}:
          </p>
          <select
            value={currentWorldId ?? ""}
            onChange={(e) => {
              const nextWorldId = e.target.value;
              setCurrentWorldId(nextWorldId);
              // const pathTail = location.pathname.split("/").slice(3).join("/") || "all";
              navigate(`/world/${nextWorldId}`);
            }}
            className={` w-full focus:outline-0 font-display text-text-onAccent text-sm ${theme.id !== "dark-fantasy" ? "text-text-onAccent italic" : "text-text-primary"}  ${theme.id === "literary-historical" ? "text-white" : ""}  ${theme.id === "dark-fantasy" ? "text-xs" : ""}`}
          >
            {worlds.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* {currentWorld && (
          <select
            value={currentWorld.themeId}
            onChange={(e) =>
              setWorldTheme(currentWorld.id, e.target.value as ThemeId)
            }
            title="Change this world's theme"
            className="rounded-md border border-border bg-bg-card px-2 py-1 text-sm text-text-secondary"
          >
            {themeIds.map((id) => (
              <option key={id} value={id}>
                {themes[id].name}
              </option>
            ))}
          </select>
        )} */}
      </div>

      {/* <button className="rounded-md border border-border bg-bg-surface px-3 py-1.5 text-text-primary">
        + New {theme.vocabulary.worldLabel.toLowerCase()}
      </button> */}

    </div>
  );
}
