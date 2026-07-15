import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { AnyEntity, Character } from "../types/entities";
import { deleteCharacter, getAllEntities, getEntity } from "../db/entities";
import { useTheme } from "../theme/theme";
import WorldNav from "../components/WorldNav";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../components/DeleteDialog";
import { useWorldStore } from "../store/worldStore";
import { VIEW_CHARACTER_SECTIONS } from "../components/character-sections";
import { EntityLookupProvider } from "../components/editor/EntityLookupContext";

export default function ViewCharacterPage() {
  const { id, worldId } = useParams<{ id?: string; worldId?: string }>();
  const [character, setCharacter] = useState<Character>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [allEntities, setAllEntities] = useState<AnyEntity[]>([]);
  const currentWorldId = useWorldStore((s) => s.currentWorldId);
  const [activeSectionId, setActiveSectionId] = useState(
    VIEW_CHARACTER_SECTIONS[0].id,
  );

  const currentWorld = useWorldStore(
    (s) => s.worlds.find((w) => w.id === currentWorldId) ?? null,
  );

  const { theme } = useTheme();
  useEffect(() => {
    if (currentWorldId) refresh(currentWorldId);
  }, [currentWorldId]);

  async function refresh(worldId: string) {
      setAllEntities(await getAllEntities(worldId));
    }

  useEffect(() => {
    if (id) {
      getEntity(id).then((existing) => {
        if (existing) setCharacter(existing as Character);
      });
    }
  }, [id]);
  async function handleDelete(id: string) {
    if (!currentWorldId) return;
    await deleteCharacter(id);
  }
  async function confirmDelete() {
    if (!id) return;
    setShowDeleteConfirm(false);
    await handleDelete(id);
  }

  const activeSection =
    VIEW_CHARACTER_SECTIONS.find((s) => s.id === activeSectionId) ??
    VIEW_CHARACTER_SECTIONS[0];
  const ActiveComponent = activeSection.Component;

  return (
    <>
    <EntityLookupProvider entities={allEntities}>
      <WorldNav
        title={`${theme.vocabulary.entityLabelsPlural.character}  ›  ${character?.name}`}
        world={currentWorld?.name}
      >
        <div className="bottom text-xs flex gap-2">
          <button
            onClick={() =>
              navigate(
                `/world/${character?.worldId}/characters/${character?.id}`,
              )
            }
          >
            Edit
          </button>
          <button onClick={() => setShowDeleteConfirm(true)}>Delete</button>
        </div>
      </WorldNav>

      <div className="sticky top-0 z-10 flex flex-col gap-2 bg-bg-surface">
        <div className="p-4">
          <p className="uppercase text-xs text-accent-secondary tracking-widest font-light">
            {character?.role} . {character?.status}
          </p>
          <h1 className="font-display">{character?.name}</h1>
          <p className="italic text-sm font-light">
            {character?.occupation || "Unknown Occupation"}
          </p>
          <div className="tag-div">
            {character?.tags &&
              character.tags.map((tag) => (
                <h6 key={`${character.id}-${tag}`}>{tag}</h6>
              ))}
          </div>
        </div>
        <nav className="flex border-y border-border">
          {VIEW_CHARACTER_SECTIONS.map((s) => (
            <p
              key={s.id}
              onClick={() => setActiveSectionId(s.id)}
              className={`nav flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-body border-0 cursor-pointer  ${theme.id === "romance" ? "border-b-2" : "border-b-2"} hover:bg-bg-surface  ${
                activeSectionId === s.id
                  ? ` text-text-primary  ${theme.id === "romance" ? "border-b-2 border-accent-primary" : "border-b-2"}`
                  : "text-text-secondary border-transparent"
              }`}
            >
              {s.label}
            </p>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <ActiveComponent
          draft={character ?? ({} as Partial<Character>)}
          characterId={id ?? null}
          worldId={currentWorldId ?? ""}
        />
      </div>
      {showDeleteConfirm && (
        <DeleteDialog
          entity={character?.name ?? ""}
          setShowDeleteConfirm={setShowDeleteConfirm}
          confirmDelete={confirmDelete}
        />
      )}
      </EntityLookupProvider>
    </>
  );
}
