// ===========================================================================
// WORLDBUILDING TOOL — CORE ENTITY SCHEMA (draft v1)
// ===========================================================================

// ----- Shared primitives ---------------------------------------------------
export type ThemeId = 'dark-fantasy' | 'romance' | 'literary-historical';

export type EntityType =
  | 'character'
  | 'location'
  | 'faction'
  | 'item'
  | 'concept'
  | 'event';

export interface BaseEntity {
  id: string;
  type: EntityType;
  worldId: string;          // every entity belongs to one "World" project
  name: string;
  aliases?: string[];
  description: string;      // plain text for now, swap to rich-text JSON later
  tags: string[];
  imageUrl?: string;
  customFields: Record<string, string>; // user-defined extra attributes
  createdAt: number;
  updatedAt: number;
}

// A fictional date that doesn't force you into a real calendar system.
// sortKey is what timelines/sorting use; display is whatever you want to show.
export interface FictionalDate {
  sortKey: number;   // e.g. days since some epoch you define per world
  display: string;   // e.g. "Third Age, Year 1421, Midsummer"
}

// ----- Type-specific entities -----------------------------------------------

export interface Character extends BaseEntity {
  type: 'character';

  // — Core identity —
  status: 'alive' | 'deceased' | 'unknown';
  role?: string;                        // story role: "Protagonist", "Antagonist", "Love interest"
  occupation?: string;                  // in-world title: "Commander of the Grey Watch"
  aliases?: string[];                   // other names they go by
  species?: string;                     // "Human", "Elf", "Unknown"
  gender?: string;                      // free text to allow any value
  age?: string;                         // free text: "34", "Unknown", "Ageless"
  birthDate?: FictionalDate;
  deathDate?: FictionalDate;

  // — World ties —
  factionId?: string;                   // primary affiliation
  homeLocationId?: string;              // where they live or operate
  // additionalLocationIds?: string[];     // other significant locations
  // relatedCharacterIds?: string[];       // linked characters (bonds defined in relationships)

  // — Appearance —
  appearance?: {
    build?: string;
    height?: string;
    eyes?: string;
    hair?: string;
    distinguishingFeatures?: string;
    description?: string;               // full physical description paragraph
    firstImpression?: string;           // how others perceive them on first meeting
    portraitUrl?: string;               // uploaded image
  };

  // — Inner life —
  personality?: {
    core?: string;                      // "Pragmatic, watchful"
    fatalFlaw?: string;
    greatestDesire?: string;
    greatestFear?: string;
    voice?: string;                     // how they speak: "Short, precise sentences"
    moralAlignment?: string;
    hidesEmotionsBy?: string;           // romance theme: "Keeps very busy"
    showsLoveBy?: string;               // romance theme: "Makes things for people"
    loveLanguage?: string;              // romance theme
  };

  // — Backstory —
  backstory?: string;

  // — Story arc —
  arc?: {
    arcType?: 'positive' | 'negative' | 'flat' | 'transformative';
    wound?: string;                     // Act I — false belief or lie they hold
    confrontation?: string;             // Act II — what forces them to change
    resolution?: string;                // Act III — who they become
  };

  // — Secrets (writer-only, excluded from exports/shares) —
  secrets?: {
    hiddenTruth?: string;
    secretMotive?: string;
    plannedReveal?: string;
    spoilerNotes?: string;
  };

  // — Writer's notes —
  writerNotes?: string;
  referenceLinks?: string[];            // mood boards, image URLs, research links
  pinnedNote?: string;                  // shown on dashboard and view sidebar

  // — Literary / historical theme extras —
  historical?: {
    period?: string;                    // "Victorian", "Regency"
    socialClass?: string;
    institution?: string;               // which body they belong to
    historicalRole?: string;            // their function in the period world
  };

  // — Completion tracking (computed, not user-set) —
  completedSections?: Array<
    | 'identity'
    | 'appearance'
    | 'character'
    | 'arc'
    | 'worldTies'
    | 'secrets'
    | 'writerNotes'
  >;
}


export interface Location extends BaseEntity {
  type: 'location';
  locationType: 'continent' | 'region' | 'city' | 'building' | 'landmark' | string;
  parentLocationId?: string;       // nesting: city inside region inside continent
  controllingFactionId?: string;
  mapImageUrl?: string;
  mapCoordinates?: { x: number; y: number }; // pin position on parent's map
}

export interface Faction extends BaseEntity {
  type: 'faction';
  factionType?: string;   // "kingdom", "guild", "religion", "criminal organization"
  leaderId?: string;      // character id
  ideology?: string;
}

export interface Item extends BaseEntity {
  type: 'item';
  itemType?: string;          // "weapon", "artifact", "document"
  currentOwnerId?: string;    // character id
  currentLocationId?: string;
  powers?: string;
}

export interface Concept extends BaseEntity {
  type: 'concept';
  conceptType?: string;  // "religion", "magic system", "language", "technology"
}

export interface WorldEvent extends BaseEntity {
  type: 'event';
  date: FictionalDate;
  locationId?: string;
  participantIds: string[];        // character ids
  outcome?: string;
  causedByEventIds?: string[];     // links to prior events, for cause/effect chains
}

export type AnyEntity =
  | Character
  | Location
  | Faction
  | Item
  | Concept
  | WorldEvent;

// ----- Relationships (these double as the graph view's edges) --------------

export type RelationshipType =
  | 'family'
  | 'rival'
  | 'ally'
  | 'romantic'
  | 'mentor'
  | 'enemy'
  | 'member_of'
  | 'located_in'
  | 'owns'
  | 'controls'
  | 'custom';

export interface Relationship {
  id: string;
  worldId: string;
  sourceId: string;
  sourceType: EntityType;
  targetId: string;
  targetType: EntityType;
  relationshipType: RelationshipType;
  label?: string;          // custom display text, e.g. "former mentor"
  description?: string;
  bidirectional: boolean;  // false for "owns", true for "rivals"
  createdAt: number;
}

// ----- World container -------------------------------------------------------

export interface World {
  id: string;
  name: string;
  description?: string;
  tagline?: string;
  genre: string;    
  themeId: ThemeId;
  calendarConfig?: {
    eraNames?: string[];
    epochLabel?: string; // what "sortKey: 0" represents, e.g. "Founding of the city"
  };
  createdAt: number;
  updatedAt: number;
}