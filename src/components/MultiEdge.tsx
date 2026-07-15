import { BaseEdge, EdgeLabelRenderer, type EdgeProps } from '@xyflow/react';

export function MultiEdge({ id, sourceX, sourceY, targetX, targetY, label, style, data }: EdgeProps) {
  const offset = (data?.offset as number) ?? 0;

  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const length = Math.hypot(dx, dy) || 1;

  // unit vector perpendicular to the source→target line, scaled by offset
  const controlX = midX + (-dy / length) * offset;
  const controlY = midY + (dx / length) * offset;

  const path = `M ${sourceX},${sourceY} Q ${controlX},${controlY} ${targetX},${targetY}`;

  return (
    <>
      <BaseEdge id={id} path={path} style={style} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${controlX}px, ${controlY}px)`,
              background: 'var(--color-bg-base)',
              color: 'var(--color-text-secondary)',
              fontSize: 11,
              padding: '1px 5px',
              borderRadius: 4,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}