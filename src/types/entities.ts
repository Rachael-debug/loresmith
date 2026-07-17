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

  // — Core classification —
  locationType: 'continent' | 'region' | 'city' | 'building' | 'landmark' | string;
  subType?: string;                     // e.g. "Capital city", "Gentlemen's club", "Flower shop"
  parentLocationId?: string;            // nesting: city inside region inside continent

  // — Identity —
  aliases?: string[];                   // old names, other names it's known by
  region?: string;                      // free-text region/territory (in addition to parentLocationId)
  address?: string;                     // street address or precise in-world locator
  neighbourhood?: string;               // area within a city
  oneLiner?: string;                    // single-sentence description for cards/previews

  // — Ownership & status —
  controllingFactionId?: string;
  ownedBy?: string;                     // free text: person or institution
  status?: 'active' | 'ruined' | 'abandoned' | 'sealed' | 'contested' | string;
  accessRules?: string;                 // who can enter, restrictions, requirements
  population?: string;                  // free text: "~340,000", "Unknown"

  // — Atmosphere —
  atmosphere?: {
    description?: string;               // full sensory/emotional description paragraph
    mood?: string;                      // dark fantasy: "Oppressive, watchful"
    climate?: string;
    lightQuality?: string;
    dominantSound?: string;
    dominantSmell?: string;
    temperature?: string;
    season?: string;
    timeOfDay?: string;
    dangerLevel?: string;
    architecture?: string;
    interior?: string;
  };

  // — Inhabitants & society (fantasy/literary) —
  inhabitants?: {
    primaryInhabitants?: string;
    factionsPresent?: string[];
    keyFigureId?: string;               // linked character
    notableGroups?: string;
  };

  // — Society & power (literary theme) —
  society?: {
    period?: string;                    // "Victorian", "Regency"
    socialClass?: string;
    powerStructure?: string;
    keyInstitution?: string;
    unspokenRules?: string;
    typicalVisitor?: string;
    whoIsExcluded?: string;
    enablesOrPrevents?: string;
  };

  // — Romantic role (romance theme) —
  romanticRole?: {
    role?: 'safeHaven' | 'tensionPoint' | 'firstMeeting' | 'confessionSite' | 'recurringAnchor' | 'climaxSetting' | string;
    meaningToProtagonist?: string;
    meaningToLoveInterest?: string;
    forcedProximityPotential?: string;
    keyTropes?: string[];
  };

  // — History —
  history?: {
    era?: 'ancient' | 'medieval' | 'recent' | 'unknown' | string;
    founded?: string;                   // origin beat
    presentEvent?: string;              // what's happening here now, in-story
    anticipatedFate?: string;           // future beat
    loreAndLegends?: string;
  };

  // — Scenes (romance theme) —
  scenes?: {
    firstVisit?: string;
    keyScene?: string;
    emotionalPeak?: string;
    finalAppearance?: string;
    sceneNotes?: string;
  };

  // — Map & position —
  mapImageUrl?: string;
  mapCoordinates?: { x: number; y: number; layer?: string }; // pin position on parent's map
  relativePosition?: string;            // prose directions: "Three days north of Veraketh"
  travelTimeFrom?: string;              // e.g. "3 days by horse", "10 min walk"
  nearestLocationId?: string;
  periodMapReference?: string;          // literary theme: "Stanford's Map of London, 1889, D4"

  // — Secrets (writer-only) —
  secrets?: {
    hiddenTruth?: string;
    secretEntrance?: string;
    whatLiesBeneath?: string;
    plannedReveal?: string;
  };

  // — Writer's notes —
  writerNotes?: string;
  scenesSetHere?: string[];
  referenceLinks?: string[];
  colorPalette?: string;                // romance theme: "Sage green, warm amber..."
  pinnedNote?: string;

  // — Research (literary theme) —
  research?: {
    accuracyNotes?: string;
    historicalParallels?: string;
    detailsToVerify?: string;
    sources?: string;
  };

  // — Completion tracking (computed) —
  completedSections?: Array<
    | 'type'
    | 'identity'
    | 'period'
    | 'atmosphere'
    | 'inhabitants'
    | 'society'
    | 'romanticRole'
    | 'scenes'
    | 'history'
    | 'mapPosition'
    | 'secrets'
    | 'writerNotes'
    | 'research'
  >;
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