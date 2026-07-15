import { useEffect, useState } from "react";
import type { AnyEntity, Relationship } from "../../types/entities";
import type { ViewSectionProps } from "./types";
import { deleteRelationship, getAllEntities, getRelationships } from "../../db/entities";
import { useWorldStore } from "../../store/worldStore";
import { getInitials } from "../../utils/utils";

export function ViewWorldTies({ draft }: ViewSectionProps) {
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [allEntities, setAllEntities] = useState<AnyEntity[]>([]);
  const worldId = useWorldStore((s) => s.currentWorldId);

  useEffect(() => {
    if (!worldId) return;
    getAllEntities(worldId).then(setAllEntities);
    refreshRelationships();
  }, [draft.id, worldId]);

  function nameOf(id: string) {
    return allEntities.find((e) => e.id === id)?.name ?? "?";
  }
  function displayLabel(r: Relationship) {
    return r.relationshipType === "custom" && r.label
      ? r.label
      : r.relationshipType;
  }
  async function refreshRelationships() {
    if (!draft.id || !worldId) return;
    const all = await getRelationships(worldId);
    setRelationships(
      all.filter((r) => r.sourceId === draft.id || r.targetId === draft.id),
    );
  }

  async function handleUnlink(id: string) {
      await deleteRelationship(id);
      await refreshRelationships();
    }

  console.log("relationships", relationships);
  return (
    <div className="details">
      <h5>Bonds</h5>
      <hr />
      {relationships.length < 1 ? (
        <p className="text-sm text-text-secondary italic mt-2">
          No relationships found
        </p>
      ) : (
        <ol className="flex flex-col gap-2 mt-2">
          {relationships.map((r) => {
            const otherId = r.sourceId === draft.id ? r.targetId : r.sourceId;
            return (
              <li
                    key={r.id}
                    className="flex items-center justify-between rounded-sm border border-border bg-bg-card px-2 py-2 text-sm"
                  >
                    <div className="flex items-center">
                      <span className={`border ${r.targetType === 'character' ? 'border-accent-secondary text-accent-secondary' : 'border-accent-tertiary text-accent-tertiary'}  p-2 rounded-sm   mr-2`}>
                        {getInitials({ name: nameOf(otherId) })}
                      </span>
                      <span className="flex flex-col">
                        {nameOf(otherId)}
                        <span className="text-text-secondary capitalize italic">
                          {displayLabel(r)}
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleUnlink(r.id)}
                      className="text-xs text-text-secondary hover:text-text-primary"
                    >
                      Unlink
                    </button>
                  </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
