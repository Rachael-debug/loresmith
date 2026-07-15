import { createContext, useContext, type ReactNode } from 'react';
import type { AnyEntity } from '../../types/entities';

interface EntityLookupValue {
  entitiesByName: Map<string, { id: string; type: AnyEntity['type'] }>;
}

const EntityLookupContext = createContext<EntityLookupValue>({ entitiesByName: new Map() });

export function EntityLookupProvider({ entities, children }: { entities: AnyEntity[]; children: ReactNode }) {
  const entitiesByName = new Map(entities.map((e) => [e.name.toLowerCase(), { id: e.id, type: e.type }]));
  return <EntityLookupContext.Provider value={{ entitiesByName }}>{children}</EntityLookupContext.Provider>;
}

export function useEntityLookup() {
  return useContext(EntityLookupContext);
}