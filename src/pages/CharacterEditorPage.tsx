import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWorldStore } from "../store/worldStore";
import { createCharacter, updateCharacter, getEntity } from "../db/entities";
import { CHARACTER_SECTIONS } from "../components/character-sections";
import type { Character } from "../types/entities";
import { useTheme } from "../theme/theme";
import { IconChevronLeft } from "@tabler/icons-react";

export function CharacterEditorPage() {
  const { id, worldId } = useParams<{ id?: string; worldId?: string }>();
  const navigate = useNavigate();
  const currentWorldId = worldId ?? useWorldStore((s) => s.currentWorldId);
  const [draft, setDraft] = useState<Partial<Character>>({ status: "alive" });
  const [activeSectionId, setActiveSectionId] = useState(
    CHARACTER_SECTIONS[0].id,
  );
  const { theme } = useTheme();

  useEffect(() => {
    if (id) {
      getEntity(id).then((existing) => {
        if (existing) setDraft(existing as Character);
      });
    }
  }, [id]);

  function handleChange<K extends keyof Character>(
    field: K,
    value: Character[K],
  ) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!currentWorldId) return;
    if (id) {
      await updateCharacter(id, draft);
    } else {
      await createCharacter(currentWorldId, draft);
    }
    navigate(`/world/${currentWorldId}/characters`);
  }

  const activeSection =
    CHARACTER_SECTIONS.find((s) => s.id === activeSectionId) ??
    CHARACTER_SECTIONS[0];
  const ActiveComponent = activeSection.Component;

  const currentWorld = useWorldStore(
    (s) => s.worlds.find((w) => w.id === currentWorldId) ?? null,
  );

  const contentRef = useRef<HTMLDivElement | null>(null);

  const currentSectionIndex = CHARACTER_SECTIONS.findIndex(
  (s) => s.id === activeSectionId,
);

const handleNextSection = () => {
  const nextIndex = (currentSectionIndex + 1) % CHARACTER_SECTIONS.length;
  setActiveSectionId(CHARACTER_SECTIONS[nextIndex].id);
  if (contentRef.current) {
    contentRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
}

const handlePreviousSection = () => {
  const prevIndex = (currentSectionIndex - 1 + CHARACTER_SECTIONS.length) % CHARACTER_SECTIONS.length;
  setActiveSectionId(CHARACTER_SECTIONS[prevIndex].id);
  if (contentRef.current) {
    contentRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
}


const sectionNumber = currentSectionIndex >= 0 ? currentSectionIndex + 1 : 1;

  return (
    <div className="flex flex-col h-screen ">
      <header
        className={`flex sticky items-center justify-between p-4 font-display border-b border-b-border  ${theme.id === "literary-historical" ? "bg-bg-surface-alt after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1a1a14] after:opacity-[0.06]" : " bg-bg-surface "}`}
      >
        <div className="flex gap-2 items-center">
          <p
            onClick={() => currentWorldId && navigate(`/world/${currentWorldId}/characters`)}
            className=" flex gap-2 text-sm cursor-pointer font-body items-center"
          >
            <IconChevronLeft size={20} />{" "}
            {theme.vocabulary.entityLabelsPlural.character}
          </p>{" "}
          |
          <p className="font-display text-sm">
            {id ? "Edit" : "New"} Character . {currentWorld?.name}
          </p>
        </div>
      </header>
      <div className="flex flex-1 overflow-y-hidden">
        <nav className="sidebar flex flex-col gap-2 md:w-52 shrink-0 border-r border-border py-4 mt-30 md:mt-0 ">
          <p className="p-4 hidden md:block uppercase font-display text-[10px] text-text-secondary tracking-[0.2em]">
            sections
          </p>
          {CHARACTER_SECTIONS.map((s) => (
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
            placeholder="Character name"
            className="mb-6 w-full border-none bg-transparent font-display text-2xl text-text-primary outline-none"
          />
          <div>
            <p className={`${theme.id !== "dark-fantasy" ? "text-accent-primary" : "text-accent-secondary"} uppercase font-body text-[10px] tracking-widest`}>
              section {sectionNumber} of {CHARACTER_SECTIONS.length}
            </p>
            <h2 className="font-display my-1 text-lg">{activeSection.label}</h2>
            <hr className="border-border py-2" />
          </div>
          <ActiveComponent draft={draft} onChange={handleChange} characterId={id ?? null} worldId={currentWorldId ?? ''}/>
          <div className="flex justify-between items-center">
            <button
            onClick={handleSave}
            className="mt-6 rounded-md bg-accent-primary px-4 py-2 text-bg-base"
          >
            Save
          </button>
          <div>
            <button
              onClick={handlePreviousSection}
              className="mt-6 mr-2 rounded-md bg-bg-surface px-4 py-2 text-text-primary border border-border"
            >
              Prev
            </button>
            <button
              onClick={handleNextSection}
              className="mt-6 rounded-md bg-bg-surface px-4 py-2 text-text-primary border border-border"
            >
              Next
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
