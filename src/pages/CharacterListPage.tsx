import { useEffect, useState } from "react";
import { useTheme } from "../theme/theme";
import { useWorldStore } from "../store/worldStore";
import {
  getEntitiesByType,
  getAllEntities,
  deleteCharacter,
} from "../db/entities";
import type { Character, AnyEntity } from "../types/entities";
import { EntityLookupProvider } from "../components/editor/EntityLookupContext";
import { RichTextView } from "../components/editor/RichTextView";
import WorldNav from "../components/WorldNav";
import { EmptyBox } from "../components/EmptyBox";
import IndividualCharacter from "../components/individualCharacter";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export function CharacterListPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const currentWorldId = useWorldStore((s) => s.currentWorldId);
  // const [world, setWorld] = useState<World | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [allEntities, setAllEntities] = useState<AnyEntity[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  useEffect(() => {
    if (currentWorldId) refresh(currentWorldId);
  }, [currentWorldId]);

  async function refresh(worldId: string) {
    setCharacters(await getEntitiesByType<Character>(worldId, "character"));
    setAllEntities(await getAllEntities(worldId));
    setSelectedCharacter(undefined)
  }


  async function handleDelete(id: string) {
    if (!currentWorldId) return;
    await deleteCharacter(id);
    await refresh(currentWorldId);
  }

  const currentWorld = useWorldStore(
    (s) => s.worlds.find((w) => w.id === currentWorldId) ?? null,
  );

  return (
    <EntityLookupProvider entities={allEntities}>
      <div className="flex flex-col max-h-screen  relative">
        <WorldNav
          title={theme.vocabulary.entityLabelsPlural.character}
          world={currentWorld?.name}
        >
          <button
            onClick={() => navigate('new')}
            className={`rounded-lg text-xs border border-border bg-bg-surface px-3 py-1.5 text-text-primary ${theme.id === "literary-historical" ? "text-white" : ""} `}
          >
            + Add {theme.vocabulary.entityLabels.character.toLowerCase()}
          </button>
        </WorldNav>

        <div
          className={`grid overflow-hidden  relative grid-rows-[auto_1fr]  ${selectedCharacter ? "md:grid-cols-[1fr_300px]" : "grid-cols-1"}`}
        >
          <div className="p-4 overflow-y-scroll ">
            {characters.length < 1 ? (
              <EmptyBox
                title={theme.vocabulary.emptyTitle.character}
                subtitle={theme.vocabulary.emptySubtitle.character}
              />
            ) : (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {characters.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCharacter(c)}
                    className={`card ${selectedCharacter?.id === c.id ? "cardselected" : ""}`}
                  >
                    <h4 className="text-sm text-text-secondary">{c.role} . {c.status}</h4>
                    <h1 className="text-text-primary">{c.name}</h1>
                    {c.description && <RichTextView content={c.description} />}
                    <div className="tag-div">
                      {c.tags && c.tags.map((tag) => <h6 key={`${c.id}-${tag}`}>{tag}</h6>)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div >
            {selectedCharacter && (
              <div className="border-l border-border fixed right-0 top-0 md:top-auto w-75 h-full bg-bg-card">
                <IconX  onClick={()=>setSelectedCharacter(undefined)} size={20} className="fixed right-2 mt-2 cursor-pointer z-1"/>
                <IndividualCharacter character={selectedCharacter} worldId={currentWorldId} handleDelete={()=>handleDelete(selectedCharacter.id)}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </EntityLookupProvider>
  );
}
