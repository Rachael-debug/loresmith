import Dexie, { type Table } from 'dexie';
import type { AnyEntity, Relationship, World } from '../types/entities';

export class LoresmithDB extends Dexie {
  worlds!: Table<World, string>;
  entities!: Table<AnyEntity, string>;
  relationships!: Table<Relationship, string>;

  constructor() {
    super('loresmith');
    this.version(1).stores({
      worlds: 'id, name',
      entities: 'id, worldId, type, name',
      relationships: 'id, worldId, sourceId, targetId',
    });

    this.version(2).stores({
      worlds: 'id, name',
      entities: 'id, worldId, type, name',
      relationships: 'id, worldId, sourceId, targetId',
    }).upgrade(async (tx) => {
      await tx.table('worlds').toCollection().modify((world) => {
        if (!world.themeId) {
          world.themeId = 'dark-fantasy';
        }
      });
    });

    this.version(3).stores({
      worlds: 'id, name',
      entities: 'id, worldId, type, name',
      relationships: 'id, worldId, sourceId, targetId',
    }).upgrade(async (tx) => {
      await tx.table('worlds').toCollection().modify((world) => {
        if (!world.genre) world.genre = 'Dark Fantasy';
        if (!world.tagline) world.tagline = '';
      });
    });
  }
}

export const db = new LoresmithDB();