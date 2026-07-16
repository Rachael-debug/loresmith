import { db } from './database';
import type { AnyEntity, Relationship, WorldEvent, Character, Location, Faction, World, ThemeId } from '../types/entities';

export async function getWorlds(): Promise<World[]> {
  return db.worlds.toArray();
}

export async function createWorld(name: string, themeId: ThemeId, genre: string, tagline?: string): Promise<World> {
  const world: World = {
    id: crypto.randomUUID(),
    name,
    themeId,
    genre,
    tagline,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await db.worlds.add(world);
  return world;
}
export async function updateWorldTheme(worldId: string, themeId: ThemeId): Promise<void> {
  await db.worlds.update(worldId, { themeId, updatedAt: Date.now() });
}

export async function createCharacter(
  worldId: string,
  data: Partial<Omit<Character, 'id' | 'type' | 'worldId' | 'createdAt' | 'updatedAt' | 'completedSections'>>
): Promise<Character> {
  const now = Date.now();
  const character: Character = {
    ...data,
    id: crypto.randomUUID(),
    type: 'character',
    worldId,
    name: data.name ?? 'Unnamed',
    description: data.description ?? '',
    tags: data.tags ?? [],
    customFields: data.customFields ?? {},
    status: data.status ?? 'alive',
    createdAt: now,
    updatedAt: now,
  };
  character.completedSections = computeCompletedSections(character);
  await db.entities.add(character);
  return character;
}

function computeCompletedSections(c: Character): Character['completedSections'] {
  const sections: NonNullable<Character['completedSections']> = [];

  if (c.role || c.occupation || c.species || c.gender || c.age || c.birthDate) {
    sections.push('identity');
  }
  if (c.appearance && Object.values(c.appearance).some(Boolean)) {
    sections.push('appearance');
  }
  if (c.personality && Object.values(c.personality).some(Boolean)) {
    sections.push('character');
  }
  if (c.arc && Object.values(c.arc).some(Boolean)) {
    sections.push('arc');
  }
  if (c.factionId || c.homeLocationId) {
  sections.push('worldTies');
}
  if (c.secrets && Object.values(c.secrets).some(Boolean)) {
    sections.push('secrets');
  }
  if (c.writerNotes || c.pinnedNote || c.referenceLinks?.length) {
    sections.push('writerNotes');
  }

  return sections;
}

export async function getCharacters(worldId: string): Promise<Character[]> {
  const all = await db.entities.where({ worldId, type: 'character' }).toArray();
  return all as Character[];
}

export async function getEntitiesByType<T extends AnyEntity>(
  worldId: string,
  type: T['type']
): Promise<T[]> {
  const all = await db.entities.where({ worldId, type }).toArray();
  return all as T[];
}

export async function createLocation(
  worldId: string,
  data: Partial<Omit<Location, 'id' | 'type' | 'worldId' | 'createdAt' | 'updatedAt'>> & {
    locationType: Location['locationType'];
  }
): Promise<Location> {
  const now = Date.now();
  const location: Location = {
    id: crypto.randomUUID(),
    type: 'location',
    worldId,
    name: data.name ?? 'Unnamed',
    description: data.description ?? '',
    tags: data.tags ?? [],
    customFields: data.customFields ?? {},
    locationType: data.locationType,
    createdAt: now,
    updatedAt: now,
  };
  location.completedSections = computeCompletedLocationSections(location);
  await db.entities.add(location);
  return location;
}

function computeCompletedLocationSections(l: Location): Location['completedSections'] {
  const sections: NonNullable<Location['completedSections']> = [];

  if (l.subType || l.locationType) {
    sections.push('type');
  }
  if (
    l.aliases?.length ||
    l.region ||
    l.address ||
    l.neighbourhood ||
    l.oneLiner ||
    l.ownedBy ||
    l.status ||
    l.population
  ) {
    sections.push('identity');
  }
  if (l.society?.period || l.society?.socialClass) {
    sections.push('period');
  }
  if (l.atmosphere && Object.values(l.atmosphere).some(Boolean)) {
    sections.push('atmosphere');
  }
  if (l.inhabitants && Object.values(l.inhabitants).some(Boolean)) {
    sections.push('inhabitants');
  }
  if (
    l.society &&
    Object.entries(l.society).some(
      ([key, value]) => key !== 'period' && key !== 'socialClass' && Boolean(value)
    )
  ) {
    sections.push('society');
  }
  if (l.romanticRole && Object.values(l.romanticRole).some(Boolean)) {
    sections.push('romanticRole');
  }
  if (l.scenes && Object.values(l.scenes).some(Boolean)) {
    sections.push('scenes');
  }
  if (l.history && Object.values(l.history).some(Boolean)) {
    sections.push('history');
  }
  if (
    l.mapImageUrl ||
    l.mapCoordinates ||
    l.relativePosition ||
    l.travelTimeFrom ||
    l.nearestLocationId ||
    l.periodMapReference
  ) {
    sections.push('mapPosition');
  }
  if (l.secrets && Object.values(l.secrets).some(Boolean)) {
    sections.push('secrets');
  }
  if (l.writerNotes || l.pinnedNote || l.scenesSetHere?.length || l.referenceLinks?.length || l.colorPalette) {
    sections.push('writerNotes');
  }
  if (l.research && Object.values(l.research).some(Boolean)) {
    sections.push('research');
  }

  return sections;
}

export async function createFaction(
    worldId: string,
    data: Partial<Omit<Faction, 'id' | 'type' | 'worldId' | 'createdAt' | 'updatedAt'>> 
): Promise<Faction>{
    const now = Date.now();
    const faction: Faction = {
        id: crypto.randomUUID(),
        type: 'faction',
        worldId,
        name: data.name ?? 'Unnamed',
        description: data.description ?? '',
        tags: data.tags || [],
        customFields: data.customFields ?? {},
        factionType: data.factionType ?? '',
        createdAt: now,
        updatedAt: now,
    };
    await db.entities.add(faction);
    return faction;
}

export async function getAllEntities(worldId: string): Promise<AnyEntity[]> {
  return db.entities.where({ worldId }).toArray();
}

export async function getRelationships(worldId: string): Promise<Relationship[]> {
  return db.relationships.where({ worldId }).toArray();
}

export async function createRelationship(
  worldId: string,
  data: {
    sourceId: string;
    sourceType: AnyEntity['type'];
    targetId: string;
    targetType: AnyEntity['type'];
    relationshipType: Relationship['relationshipType'];
    label?: string;
  }
): Promise<Relationship> {
  const relationship: Relationship = {
    id: crypto.randomUUID(),
    worldId,
    sourceId: data.sourceId,
    sourceType: data.sourceType,
    targetId: data.targetId,
    targetType: data.targetType,
    relationshipType: data.relationshipType,
    label: data.label,
    bidirectional: false,
    createdAt: Date.now(),
  };
  await db.relationships.add(relationship);
  return relationship;
}

export async function deleteRelationship(id: string): Promise<void> {
  await db.relationships.delete(id);
}


export async function createEvent(
  worldId: string,
  data: Partial<Omit<WorldEvent, 'id' | 'type' | 'worldId' | 'createdAt' | 'updatedAt'>> & {
    date: WorldEvent['date'];
  }
): Promise<WorldEvent> {
  const now = Date.now();
  const event: WorldEvent = {
    id: crypto.randomUUID(),
    type: 'event',
    worldId,
    name: data.name ?? 'Unnamed',
    description: data.description ?? '',
    tags: data.tags ?? [],
    customFields: data.customFields ?? {},
    date: data.date,
    locationId: data.locationId,
    participantIds: data.participantIds ?? [],
    outcome: data.outcome,
    createdAt: now,
    updatedAt: now,
  };
  await db.entities.add(event);
  return event;
}

export async function getEntity(id: string): Promise<AnyEntity | undefined> {
  return db.entities.get(id);
}

export async function updateCharacter(id: string, changes: Partial<Character>): Promise<void> {
  const existing = (await db.entities.get(id)) as Character;
  const updated: Character = { ...existing, ...changes, id, type: 'character', updatedAt: Date.now() };
  updated.completedSections = computeCompletedSections(updated);
  await db.entities.put(updated);
}

export async function deleteEntity(id: string): Promise<void> {
  await db.entities.delete(id);
}

export async function fetchBoundCharacters(locationId: string, worldId: string): Promise<Character[]> {
  const allCharacters = await getEntitiesByType<Character>(worldId, 'character');
  return allCharacters.filter((char) => char.homeLocationId === locationId);
}