import { useEffect, useState } from "react";
import { useTheme } from "../theme/theme";
import {
  createFaction,
  getEntitiesByType,
  getAllEntities,
} from "../db/entities";
import { EntityForm } from "../components/EntityForm";
import type { Faction, AnyEntity } from "../types/entities";
import { EntityLookupProvider } from "../components/editor/EntityLookupContext";
import { RichTextView } from "../components/editor/RichTextView";
import { useWorldStore } from "../store/worldStore";
import WorldNav from "../components/WorldNav";
import { EmptyBox } from "../components/EmptyBox";

export function FactionListPage() {
  const { theme } = useTheme();
  const currentWorldId = useWorldStore((s) => s.currentWorldId);
  const [factions, setFactions] = useState<Faction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [factionType, setFactionType] = useState<string>("");
  const [allEntities, setAllEntities] = useState<AnyEntity[]>([]);

  useEffect(() => {
    if (currentWorldId) {
      refresh(currentWorldId);
    }
  }, [currentWorldId]);

  async function refresh(worldId: string) {
    setFactions(await getEntitiesByType<Faction>(worldId, "faction"));
    setAllEntities(await getAllEntities(worldId));
  }

  async function handleCreate(data: {
    name: string;
    description: string;
    tags: string[];
  }) {
    if (!currentWorldId) return;
    await createFaction(currentWorldId, { ...data, factionType });
    setShowForm(false);
    await refresh(currentWorldId);
  }

  const currentWorld = useWorldStore(
    (s) => s.worlds.find((w) => w.id === currentWorldId) ?? null,
  );

  return (
    <EntityLookupProvider entities={allEntities}>
      <WorldNav
        title={theme.vocabulary.entityLabelsPlural.faction}
        world={currentWorld?.name}
      >
        <button
          onClick={() => setShowForm((s) => !s)}
          className={`rounded-lg text-xs border border-border bg-bg-surface px-3 py-1.5 text-text-primary ${theme.id === "literary-historical" ? "text-white" : ""} `}
        >
          + Add {theme.vocabulary.entityLabels.faction.toLowerCase()}
        </button>
      </WorldNav>

      <div className="p-4">
        {showForm && (
          <div className="mt-4">
            <EntityForm
              title={`New ${theme.vocabulary.entityLabels.faction}`}
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            >
              <input
                value={factionType}
                onChange={(e) => setFactionType(e.target.value)}
                placeholder="Faction Type"
                className="rounded-md border border-border bg-bg-surface px-2 py-1.5 text-text-primary"
              />
            </EntityForm>
          </div>
        )}

        {factions.length < 1 ? (
          <EmptyBox
            title={theme.vocabulary.emptyTitle.faction}
            subtitle={theme.vocabulary.emptySubtitle.faction}
          />
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {factions.map((f) => (
              <div key={f.id} className="card">
                <h4 className="text-sm text-text-secondary">{f.factionType}</h4>
                <h1 className="text-text-primary">{f.name}</h1>
                {f.description && <RichTextView content={f.description} />}
                <div className="tag-div">
                  {f.tags && f.tags.map((tag) => <h6>{tag}</h6>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </EntityLookupProvider>
  );
}
