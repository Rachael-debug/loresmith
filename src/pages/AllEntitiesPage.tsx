import { useEffect, useState } from "react";
import { useWorldStore } from "../store/worldStore";
import { useTheme } from "../theme/theme";
import type { AnyEntity, Character } from "../types/entities";
import { deleteCharacter, getAllEntities } from "../db/entities";
import { RichTextView } from "../components/editor/RichTextView";
import WorldNav from "../components/WorldNav";
import { IconX } from "@tabler/icons-react";
import { EntityLookupProvider } from "../components/editor/EntityLookupContext";
import { useNavigate } from "react-router-dom";
import IndividualCharacter from "../components/individualCharacter";

export default function AllEntitiesPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const currentWorldId = useWorldStore((s) => s.currentWorldId);
  const [allEntities, setAllEntities] = useState<AnyEntity[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  useEffect(() => {
    if (currentWorldId) refresh(currentWorldId);
  }, [currentWorldId]);

  async function refresh(worldId: string) {
    setAllEntities(await getAllEntities(worldId));
  }
  const currentWorld = useWorldStore(
    (s) => s.worlds.find((w) => w.id === currentWorldId) ?? null,
  );

  async function handleDelete(id: string) {
    if (!currentWorldId) return;
    await deleteCharacter(id);
    await refresh(currentWorldId);
  }

  return (
    <>
      <EntityLookupProvider entities={allEntities}>
        <WorldNav
          title={theme.vocabulary.entityLabelsPlural.character}
          world={currentWorld?.name}
        >
          {/* <button
          onClick={() => setShowForm((s) => !s)}
          className={`rounded-lg text-xs border border-border bg-bg-surface px-3 py-1.5 text-text-primary ${theme.id === "literary-historical" ? "text-white" : ""} `}
        >
          + Add {theme.vocabulary.entityLabels.character.toLowerCase()}
        </button> */}
        </WorldNav>

        <div
          className={`grid overflow-hidden  relative grid-rows-[auto_1fr]  ${selectedCharacter ? "md:grid-cols-[1fr_300px]" : "grid-cols-1"}`}
        >
          <div className="flex flex-col gap-6 p-4">
            <div>
              <div className="flex justify-between mb-2">
                <p
                  className={`flex items-center gap-1 font-display  ${theme.id === "romance" ? "italic text-sm before:content-[''] before:inline-block before:w-4 before:h-px before:bg-border after:content-[''] after:inline-block after:w-4 after:h-px after:bg-border" : "uppercase tracking-widest text-[10px]"}`}
                >
                  {theme.id === "dark-fantasy" && (
                    <span className="before:content-['✦'] before:text-[8px] before:text-amber-500 before:mr-1"></span>
                  )}
                  {theme.vocabulary.entityLabelsPlural.character}
                </p>
                <p
                  onClick={() =>
                    navigate(`/world/${currentWorldId}/characters`)
                  }
                  className="italic font-body text-text-secondary text-xs font-light cursor-pointer"
                >
                  see all
                </p>
              </div>
              {theme.id === "dark-fantasy" && (
                <hr className="border-border mb-2" />
              )}
              {theme.id === "literary-historical" && (
                <>
                  <hr className="border-black border-[1.5px] mb-0.5" />{" "}
                  <hr className="border-border border mb-2" />
                </>
              )}
              <div className="grid grid-cols-1 gap-4  md:grid-cols-3 ">
                {allEntities.filter((c) => c.type === "character").length >
                0 ? (
                  <>
                    {allEntities
                      .filter((c) => c.type === "character")
                      .map((c) => (
                        <div
                          key={c.id}
                          className={`card ${selectedCharacter?.id === c.id ? "cardselected" : ""}`}
                          onClick={() => setSelectedCharacter(c)}
                        >
                          <h4 className="text-sm text-text-secondary">
                            {c.role} . {c.status}
                          </h4>
                          <h1 className="text-text-primary">{c.name}</h1>

                          {c.description && (
                            <RichTextView content={c.description} />
                          )}

                          <div className="tag-div">
                            {c.tags &&
                              c.tags.map((tag) => <h6 key={tag}>{tag}</h6>)}
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <div className="rounded-sm flex flex-col text-sm font-light text-center gap-2 border border-border border-dashed p-4">
                    <p className="text-text-secondary italic ">
                      No {theme.vocabulary.entityLabels.character} Found
                    </p>
                    <button
                      onClick={() =>
                        navigate(`/world/${currentWorldId}/characters/new`)
                      }
                      className="text-xs"
                    >
                      + Add {theme.vocabulary.entityLabels.character}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p
                  className={`flex items-center gap-1 font-display  ${theme.id === "romance" ? "italic text-sm before:content-[''] before:inline-block before:w-4 before:h-px before:bg-border after:content-[''] after:inline-block after:w-4 after:h-px after:bg-border" : "uppercase tracking-widest text-[10px]"}`}
                >
                  {theme.id === "dark-fantasy" && (
                    <span className="before:content-['✦'] before:text-[8px] before:text-amber-500 before:mr-1"></span>
                  )}
                  {theme.vocabulary.entityLabelsPlural.location}
                </p>
                <p
                  onClick={() => navigate(`/world/${currentWorldId}/locations`)}
                  className="italic font-body text-text-secondary text-xs font-light cursor-pointer"
                >
                  see all
                </p>
              </div>
              {theme.id === "dark-fantasy" && (
                <hr className="border-border mb-2" />
              )}
              {theme.id === "literary-historical" && (
                <>
                  <hr className="border-black border-[1.5px] mb-0.5" />{" "}
                  <hr className="border-border border mb-2" />
                </>
              )}
              <div className="grid grid-cols-1 gap-4  md:grid-cols-3 ">
                {allEntities.filter(
                  (c) => c.type === "location" || c.type === "faction",
                ).length > 0 ? (
                  <>
                    {" "}
                    {allEntities
                      .filter(
                        (c) => c.type === "location" || c.type === "faction",
                      )
                      .map((c) => (
                        <div key={c.id} className="card">
                          {c.type === "location" && (
                            <h4 className="text-sm text-accent-secondary">
                              {theme.vocabulary.entityLabels.location}
                            </h4>
                          )}
                          {c.type === "faction" && (
                            <h4 className="text-sm ">
                              {theme.vocabulary.entityLabels.faction}
                            </h4>
                          )}
                          <h1 className="text-text-primary">{c.name}</h1>

                          {c.description && (
                            <RichTextView content={c.description} />
                          )}

                          <div className="tag-div">
                            {c.tags &&
                              c.tags.map((tag) => (
                                <h6 key={`${c.id}-${tag}`}>{tag}</h6>
                              ))}
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <div className="rounded-sm flex flex-col text-sm font-light text-center gap-2 border border-border border-dashed p-4">
                    <p className="text-text-secondary italic ">
                      No {theme.vocabulary.entityLabels.location} or{" "}
                      {theme.vocabulary.entityLabels.faction} Found
                    </p>
                    <button onClick={() => navigate("/")} className="text-xs">
                      + Add {theme.vocabulary.entityLabels.location}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {selectedCharacter && (
              <div className="border-l border-border fixed right-0 top-0 md:top-auto w-75 h-full bg-bg-card">
                <IconX
                  onClick={() => setSelectedCharacter(undefined)}
                  size={20}
                  className="fixed right-2 mt-2 cursor-pointer z-1"
                />
                <IndividualCharacter
                  character={selectedCharacter}
                  worldId={currentWorldId}
                  handleDelete={() => handleDelete(selectedCharacter.id)}
                />
              </div>
            )}
          </div>
        </div>
      </EntityLookupProvider>
    </>
  );
}
