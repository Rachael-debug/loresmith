import { useEffect, useState, type FormEvent } from "react";
import {
  getAllEntities,
  getRelationships,
  createRelationship,
  deleteRelationship,
} from "../db/entities";
import type { AnyEntity, Relationship } from "../types/entities";
import { useTheme } from "../theme/theme";
import { useWorldStore } from "../store/worldStore";
import WorldNav from "../components/WorldNav";

const RELATIONSHIP_TYPES: Relationship["relationshipType"][] = [
  "family",
  "rival",
  "ally",
  "romantic",
  "mentor",
  "enemy",
  "member_of",
  "located_in",
  "owns",
  "controls",
  "custom",
];

export function ConnectionsPage() {
  const { theme } = useTheme();
  const currentWorldId = useWorldStore((s) => s.currentWorldId);
  const [entities, setEntities] = useState<AnyEntity[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [sourceId, setSourceId] = useState("");
  const [targetId, setTargetId] = useState("");
  const [relType, setRelType] =
    useState<Relationship["relationshipType"]>("ally");

  useEffect(() => {
    if (currentWorldId) {
      refresh(currentWorldId);
    }
  }, [currentWorldId]);

  async function refresh(worldId: string) {
    setEntities(await getAllEntities(worldId));
    setRelationships(await getRelationships(worldId));
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!currentWorldId || !sourceId || !targetId) return;
    const source = entities.find((en) => en.id === sourceId)!;
    const target = entities.find((en) => en.id === targetId)!;
    await createRelationship(currentWorldId, {
      sourceId,
      sourceType: source.type,
      targetId,
      targetType: target.type,
      relationshipType: relType,
    });
    setRelationships(await getRelationships(currentWorldId));
  }

  async function handleDelete(id: string) {
    if (!currentWorldId) return;
    await deleteRelationship(id);
    setRelationships(await getRelationships(currentWorldId));
  }

  const currentWorld = useWorldStore(
    (s) => s.worlds.find((w) => w.id === currentWorldId) ?? null,
  );

  const nameOf = (id: string) => entities.find((e) => e.id === id)?.name ?? "?";
  const selectClasses =
    "rounded-md border border-border bg-bg-surface px-2 py-1.5 text-text-primary";

  return (
    <div >
      <WorldNav
        title= {theme.vocabulary.connectionsLabel}
        world={currentWorld?.name}
      />

      <div className="p-4">
        <form
        onSubmit={handleCreate}
        className="mt-4 flex flex-wrap items-end gap-2 rounded-lg border border-border bg-bg-card p-4"
      >
        <select
          value={sourceId}
          onChange={(e) => setSourceId(e.target.value)}
          className={selectClasses}
        >
          <option value="">Select source...</option>
          {entities.map((en) => (
            <option key={en.id} value={en.id}>
              {en.type}: {en.name}
            </option>
          ))}
        </select>
        <select
          value={relType}
          onChange={(e) =>
            setRelType(e.target.value as Relationship["relationshipType"])
          }
          className={selectClasses}
        >
          {RELATIONSHIP_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          className={selectClasses}
        >
          <option value="">Select target...</option>
          {entities.map((en) => (
            <option key={en.id} value={en.id}>
              {en.type}: {en.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-accent-primary px-3 py-1.5 text-bg-base"
        >
          Link
        </button>
      </form>

      <ul className="mt-4 flex flex-col gap-1">
        {relationships.map((r) => (
          <li
            key={r.id}
            className="flex items-center justify-between text-text-secondary"
          >
            <span>
              {nameOf(r.sourceId)} —{" "}
              <span className="text-text-primary">{r.relationshipType}</span> —{" "}
              {nameOf(r.targetId)}
            </span>
            <button
              onClick={() => handleDelete(r.id)}
              className="text-sm text-text-secondary hover:text-text-primary"
            >
              Unlink
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
