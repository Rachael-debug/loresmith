import { useEffect, useMemo, useState } from 'react';
import { ReactFlow, Background, Controls, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { getAllEntities, getRelationships } from '../db/entities';
import type { AnyEntity, Relationship } from '../types/entities';
import { MultiEdge } from '../components/MultiEdge';
import { useWorldStore } from '../store/worldStore';
import WorldNav from '../components/WorldNav';
import { useTheme } from '../theme/theme';

function layoutNodes(entities: AnyEntity[]): Node[] {
  const columnByType: Record<string, number> = {
    character: 0, faction: 1, location: 2, item: 3, concept: 4, event: 5,
  };
  const rowCounters: Record<string, number> = {};

  return entities.map((entity) => {
    const column = columnByType[entity.type] ?? 0;
    const row = rowCounters[entity.type] ?? 0;
    rowCounters[entity.type] = row + 1;

    return {
      id: entity.id,
      position: { x: column * 220, y: row * 100 },
      data: { label: entity.name },
      style: {
        background: 'var(--color-bg-card)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        fontFamily: 'var(--font-body)',
      },
    };
  });
}

const edgeTypes = { multi: MultiEdge };

function offsetForIndex(i: number, step = 40): number {
  if (i === 0) return 0;
  const magnitude = Math.ceil(i / 2) * step;
  return i % 2 === 0 ? magnitude : -magnitude;
}

function toEdges(relationships: Relationship[]): Edge[] {
  const groups: Record<string, Relationship[]> = {};
  for (const r of relationships) {
    const key = [r.sourceId, r.targetId].sort().join('--');
    (groups[key] ??= []).push(r);
  }

  const edges: Edge[] = [];
  for (const group of Object.values(groups)) {
    group.forEach((r, index) => {
      edges.push({
        id: r.id,
        source: r.sourceId,
        target: r.targetId,
        label: r.label ?? r.relationshipType,
        type: 'multi',
        data: { offset: offsetForIndex(index) },
        style: { stroke: 'var(--color-accent-primary)' },
      });
    });
  }
  return edges;
}

export function GraphPage() {
  const { theme } = useTheme();
  const currentWorldId = useWorldStore((s) => s.currentWorldId);
  const [entities, setEntities] = useState<AnyEntity[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);

  useEffect(() => {
    if (currentWorldId) {
      refresh(currentWorldId);
    }
  }, [currentWorldId]);

  async function refresh(worldId: string) {
    setEntities(await getAllEntities(worldId));
    setRelationships(await getRelationships(worldId));
  }

  const nodes = useMemo(() => layoutNodes(entities), [entities]);
  const edges = useMemo(() => toEdges(relationships), [relationships]);

  const currentWorld = useWorldStore(
      (s) => s.worlds.find((w) => w.id === currentWorldId) ?? null,
    );

  return (
    <>
    <WorldNav
            title={theme.vocabulary.graphLabel}
            world={currentWorld?.name}
          />
    <div className="m-4 h-[70vh] rounded-lg border border-border">
      <ReactFlow nodes={nodes} edges={edges} edgeTypes={edgeTypes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
    </>
  );
}
