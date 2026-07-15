import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { useNavigate } from 'react-router-dom';
import { useEntityLookup } from './EntityLookupContext';
import { useWorldStore } from '../../store/worldStore';

// const ROUTE_BY_TYPE: Record<string, string> = {
//   character: '/characters',
//   location: '/locations',
//   faction: '/factions',
// };

export function WikiLinkView({ node }: NodeViewProps) {
  const navigate = useNavigate();
  const { entitiesByName } = useEntityLookup();
  const label = node.attrs.label as string;
  const target = entitiesByName.get(label.toLowerCase());
  const worldId = useWorldStore((s) => s.currentWorldId);

  return (
    <NodeViewWrapper as="span">
      <span
        // onClick={() => target && navigate(ROUTE_BY_TYPE[target.type] ?? `/world/${worldId}/characters/${target.id}`)}
        onClick={() => target && navigate(`/world/${worldId}/characters/view/${target.id}`)}
        className={target ? 'cursor-pointer text-accent-primary underline' : 'cursor-default text-accent-secondary line-through'}
        title={target ? `Go to ${label}` : `No entity named "${label}" yet`}
      >
        {label}
      </span>
    </NodeViewWrapper>
  );
}