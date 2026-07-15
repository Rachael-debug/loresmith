import { useEffect, useState } from 'react';
import { getEntitiesByType, getAllEntities, getRelationships, createRelationship, deleteRelationship } from '../../db/entities';
import type { SectionProps } from './types';
import type { Faction, Location, AnyEntity, Relationship } from '../../types/entities';

const LOCATION_RELATIONSHIP_TYPES: Relationship['relationshipType'][] = ['member_of', 'located_in', 'owns', 'controls', 'custom'];
const CHARACTER_RELATIONSHIP_TYPES: Relationship['relationshipType'][] = ['family', 'rival', 'ally', 'romantic', 'mentor', 'enemy', 'custom'];

function AddTieControl({ options, relationshipTypes, onAdd }: {
  options: { id: string; name: string }[];
  relationshipTypes: Relationship['relationshipType'][];
  onAdd: (targetId: string, type: Relationship['relationshipType'], label?: string) => void;
}) {
  const [targetId, setTargetId] = useState('');
  const [type, setType] = useState<Relationship['relationshipType']>(relationshipTypes[0]);
  const [customLabel, setCustomLabel] = useState('');
  const selectClasses = 'rounded-md border border-border bg-bg-surface px-2 py-1 text-sm text-text-primary';

  function handleAdd() {
    if (!targetId) return;
    if (type === 'custom' && !customLabel.trim()) return;
    onAdd(targetId, type, type === 'custom' ? customLabel.trim() : undefined);
    setTargetId('');
    setCustomLabel('');
  }

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      <select value={targetId} onChange={(e) => setTargetId(e.target.value)} className={selectClasses}>
        <option value="">Select...</option>
        {options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
      <select value={type} onChange={(e) => setType(e.target.value as Relationship['relationshipType'])} className={selectClasses}>
        {relationshipTypes.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
      {type === 'custom' && (
        <input
          value={customLabel}
          onChange={(e) => setCustomLabel(e.target.value)}
          placeholder="Describe the tie..."
          className={selectClasses}
        />
      )}
      <button onClick={handleAdd} className="rounded-md bg-accent-primary px-2.5 py-1 text-sm text-bg-base">+ Add</button>
    </div>
  );
}

export function WorldTiesSection({ draft, onChange, characterId, worldId }: SectionProps) {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [allEntities, setAllEntities] = useState<AnyEntity[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);

  useEffect(() => {
    if (!worldId) return;
    getEntitiesByType<Faction>(worldId, 'faction').then(setFactions);
    getEntitiesByType<Location>(worldId, 'location').then(setLocations);
    getAllEntities(worldId).then(setAllEntities);
    refreshRelationships();
  }, [worldId, characterId]);

  async function refreshRelationships() {
    if (!characterId || !worldId) return;
    const all = await getRelationships(worldId);
    setRelationships(all.filter((r) => r.sourceId === characterId || r.targetId === characterId));
  }

  function nameOf(id: string) {
    return allEntities.find((e) => e.id === id)?.name ?? '?';
  }

  function otherSideType(r: Relationship) {
    const otherId = r.sourceId === characterId ? r.targetId : r.sourceId;
    return allEntities.find((e) => e.id === otherId)?.type;
  }

  function displayLabel(r: Relationship) {
    return r.relationshipType === 'custom' && r.label ? r.label : r.relationshipType;
  }

  const locationTies = relationships.filter((r) => otherSideType(r) === 'location');
  const characterTies = relationships.filter((r) => otherSideType(r) === 'character');

  async function handleLink(targetId: string, targetType: AnyEntity['type'], relationshipType: Relationship['relationshipType'], label?: string) {
    if (!characterId) return;
    await createRelationship(worldId, { sourceId: characterId, sourceType: 'character', targetId, targetType, relationshipType, label });
    await refreshRelationships();
  }

  async function handleUnlink(id: string) {
    await deleteRelationship(id);
    await refreshRelationships();
  }

  const selectClasses = 'rounded-sm border focus:outline-1 border-border bg-bg-surface px-2 py-1.5 text-text-primary';

  function TieList({ ties }: { ties: Relationship[] }) {
    return (
      <ul className="mt-2 flex flex-col gap-1">
        {ties.map((r) => {
          const otherId = r.sourceId === characterId ? r.targetId : r.sourceId;
          return (
            <li key={r.id} className="flex items-center justify-between rounded-sm border border-border bg-bg-card px-2 py-1 text-sm">
              <span>{nameOf(otherId)} <span className="text-text-secondary">— {displayLabel(r)}</span></span>
              <button onClick={() => handleUnlink(r.id)} className="text-xs text-text-secondary hover:text-text-primary">Unlink</button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <label className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-widest text-text-secondary">Primary faction</span>
        <select value={draft.factionId ?? ''} onChange={(e) => onChange('factionId', e.target.value || undefined)} className={selectClasses}>
          <option value="">None</option>
          {factions.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-widest text-text-secondary">Home location</span>
        <select value={draft.homeLocationId ?? ''} onChange={(e) => onChange('homeLocationId', e.target.value || undefined)} className={selectClasses}>
          <option value="">None</option>
          {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
      </label>

      <div>
        <span className="text-[10px] uppercase tracking-widest text-text-secondary">Other locations</span>
        {!characterId ? (
          <p className="mt-1 text-sm italic text-text-secondary">Save this character first to link other locations.</p>
        ) : (
          <>
            <TieList ties={locationTies} />
            <AddTieControl
              options={locations.filter((l) => l.id !== draft.homeLocationId)}
              relationshipTypes={LOCATION_RELATIONSHIP_TYPES}
              onAdd={(targetId, type, label) => handleLink(targetId, 'location', type, label)}
            />
          </>
        )}
      </div>

      <div>
        <span className="text-[10px] uppercase tracking-widest text-text-secondary">Related characters</span>
        {!characterId ? (
          <p className="mt-1 text-sm italic text-text-secondary">Save this character first to link other characters.</p>
        ) : (
          <>
            <TieList ties={characterTies} />
            <AddTieControl
              options={allEntities.filter((e) => e.type === 'character' && e.id !== characterId)}
              relationshipTypes={CHARACTER_RELATIONSHIP_TYPES}
              onAdd={(targetId, type, label) => handleLink(targetId, 'character', type, label)}
            />
          </>
        )}
      </div>
    </div>
  );
}