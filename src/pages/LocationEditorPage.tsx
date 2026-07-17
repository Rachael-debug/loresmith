import { IconChevronLeft } from "@tabler/icons-react";
import { useWorldStore } from "../store/worldStore";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../theme/theme";
import { LOCATION_SECTIONS_BY_THEME } from "../components/location-sections";
import { useEffect, useRef, useState } from "react";
import type { AnyEntity, Location } from "../types/entities";
import { getAllEntities, getEntity } from "../db/entities";
import { EntityLookupProvider } from "../components/editor/EntityLookupContext";

export function LocationEditorPage() {
  const { id, worldId } = useParams<{ id?: string; worldId?: string }>();
  const navigate = useNavigate();
  const currentWorldId = worldId ?? useWorldStore((s) => s.currentWorldId);
  const [allEntities, setAllEntities] = useState<AnyEntity[]>([]);
  const { theme } = useTheme();
  const sections = LOCATION_SECTIONS_BY_THEME[theme.id];
  const [activeSectionId, setActiveSectionId] = useState(
    sections[0].id,
  );
  const [draft, setDraft] = useState<Partial<Location>>({});

  useEffect(() => {
    if (currentWorldId) refresh(currentWorldId);
  }, [currentWorldId]);

  async function refresh(worldId: string) {
    setAllEntities(await getAllEntities(worldId));
  }

  const activeSection = sections.find((s) => s.id === activeSectionId) ?? sections[0];
  const ActiveComponent = activeSection.Component;
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (id) {
      getEntity(id).then((existing) => {
        if (existing) setDraft(existing as Location);
      });
    }
  }, [id]);

  function handleChange<K extends keyof Location>(
    field: K,
    value: Location[K],
  ) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  console.log(draft)
  const currentSectionIndex =sections.findIndex(
    (s) => s.id === activeSectionId,
  );
  const sectionNumber = currentSectionIndex >= 0 ? currentSectionIndex + 1 : 1;

  const currentWorld = useWorldStore(
    (s) => s.worlds.find((w) => w.id === currentWorldId) ?? null,
  );
  return (
     <EntityLookupProvider entities={allEntities}>
    <div className="flex flex-col h-screen ">
      <header
        className={`flex sticky items-center justify-between p-4 font-display border-b border-b-border  ${theme.id === "literary-historical" ? "bg-bg-surface-alt after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1a1a14] after:opacity-[0.06]" : " bg-bg-surface "}`}
      >
        <div className="flex gap-2 items-center">
          <p
            onClick={() =>
              currentWorldId && navigate(`/world/${currentWorldId}/locations`)
            }
            className=" flex gap-2 text-sm cursor-pointer font-body items-center"
          >
            <IconChevronLeft size={20} />{" "}
            {theme.vocabulary.entityLabelsPlural.location}
          </p>
          |
          <p className="font-display text-sm">
            {id ? "Edit" : "New"} Location . {currentWorld?.name}
          </p>
        </div>
      </header>
      <div className="flex flex-1 overflow-y-hidden">
        <nav className="sidebar flex flex-col gap-2 md:w-52 shrink-0 border-r border-border py-4 mt-30 md:mt-0 ">
            <p className="p-4 hidden md:block uppercase font-display text-[10px] text-text-secondary tracking-[0.2em]">
            sections
          </p>
          {sections.map((s) => (
            <p
              key={s.id}
              onClick={() => setActiveSectionId(s.id)}
              className={`nav flex w-full items-center gap-2 px-4 py-1 text-left text-sm font-body border-0 cursor-pointer  ${theme.id === "romance" ? "border-r-2" : "border-l-2"} hover:bg-bg-surface  ${
                activeSectionId === s.id
                  ? ` text-text-primary  ${theme.id === "romance" ? "border-r-2 border-accent-primary" : "border-l-2"}`
                  : "text-text-secondary border-transparent"
              }`}
            >
              <s.icon size={15} />
              <span className="hidden md:block">{s.label}</span>
            </p>
          ))}
        </nav>
        <div ref={contentRef} className="flex-1 p-6 border-l border-border overflow-y-scroll ml-10 md:ml-0">
            <input
            value={draft.name ?? ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Location name"
            className="mb-6 w-full border-none bg-transparent font-display text-2xl text-text-primary outline-none"
          />
          <div>
                      <p className={`${theme.id !== "dark-fantasy" ? "text-accent-primary" : "text-accent-secondary"} uppercase font-body text-[10px] tracking-widest`}>
                        section {sectionNumber} of {sections.length}
                      </p>
                      <h2 className="font-display mt-1 text-lg">{activeSection.label}</h2>
                      <p className="text-xs text-text-secondary italic mb-4">{activeSection.desc}</p>
                      <hr className="border-border py-2" />
                    </div>
          <ActiveComponent  draft={draft} onChange={handleChange} locationId={id ?? null} worldId={currentWorldId ?? ''}/>
        </div>
      </div>
    </div>
    </EntityLookupProvider>
  );
}
