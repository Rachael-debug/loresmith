import { useEffect, useState } from 'react';
import { useTheme } from '../theme/theme';
import { useWorldStore } from '../store/worldStore';
import { createLocation, getEntitiesByType, getAllEntities } from '../db/entities';
import { EntityForm } from '../components/EntityForm';
import type { Location, AnyEntity } from '../types/entities';
import { EntityLookupProvider } from '../components/editor/EntityLookupContext';
import { RichTextView } from '../components/editor/RichTextView';
import WorldNav from '../components/WorldNav';
import { EmptyBox } from '../components/EmptyBox';

export function LocationListPage() {
  const { theme } = useTheme();
  const currentWorldId = useWorldStore((s) => s.currentWorldId);
  const [locations, setLocations] = useState<Location[]>([]);
  const [allEntities, setAllEntities] = useState<AnyEntity[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [locationType, setLocationType] = useState<Location['locationType']>('city');

  useEffect(() => {
    if (currentWorldId) refresh(currentWorldId);
  }, [currentWorldId]);

  async function refresh(worldId: string) {
    setLocations(await getEntitiesByType<Location>(worldId, 'location'));
    setAllEntities(await getAllEntities(worldId));
  }

  async function handleCreate(data: { name: string; description: string; tags: string[] }) {
    if (!currentWorldId) return;
    await createLocation(currentWorldId, { ...data, locationType });
    setShowForm(false);
    await refresh(currentWorldId);
  }

  const currentWorld = useWorldStore(
    (s) => s.worlds.find((w) => w.id === currentWorldId) ?? null,
  );

  return (
    <EntityLookupProvider entities={allEntities}>
      <WorldNav
        title={theme.vocabulary.entityLabelsPlural.location}
        world={currentWorld?.name}
      >
        <button
          onClick={() => setShowForm((s) => !s)}
          className={`rounded-lg text-xs border border-border bg-bg-surface px-3 py-1.5 text-text-primary ${theme.id === "literary-historical" ? "text-white" : ""} `}
        >
          + Add {theme.vocabulary.entityLabels.location.toLowerCase()}
        </button>
      </WorldNav>

    <div className="p-4">
      {showForm && (
        <div className="mt-4">
          <EntityForm title={`New ${theme.vocabulary.entityLabels.location}`} onSubmit={handleCreate} onCancel={() => setShowForm(false)}>
            <select value={locationType} onChange={(e) => setLocationType(e.target.value as Location['locationType'])} className="rounded-md border border-border bg-bg-surface px-2 py-1.5 text-text-primary">
              <option value="continent">Continent</option>
              <option value="region">Region</option>
              <option value="city">City</option>
              <option value="building">Building</option>
            </select>
          </EntityForm>
        </div>
      )}

      {locations.length < 1 ? (
                <EmptyBox
                  title={theme.vocabulary.emptyTitle.location}
                  subtitle={theme.vocabulary.emptySubtitle.location}
                />
              ) : (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {locations.map((l) => (
          <div key={l.id} className="card">
            <h4 className="text-sm text-text-secondary">{l.locationType}</h4>
            <h1 className="text-text-primary">{l.name}</h1>
            {l.description && <RichTextView content={l.description} />}
            <div className="tag-div">
                        {l.tags && l.tags.map((tag) => <h6>{tag}</h6>)}
                      </div>
          </div>
        ))}
      </div>)}
    </div>
    </EntityLookupProvider>
  );
}