// ===========================================================================
// THEME SYSTEM SCHEMA (draft v1)
// Semantic color/font/shape tokens + per-theme vocabulary, consumed by a
// ThemeProvider. Components reference ONLY the semantic slots below —
// never a literal hex value, never a theme-specific name like "ember".
// ===========================================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ThemeId } from "../types/entities";
export type { ThemeId } from "../types/entities";

// ----- Color tokens ----------------------------------------------------------

export interface ColorTokens {
  bg: {
    base: string; // page background
    surface: string; // sidebar / panel background — can differ from base
    surfaceAlt: string; // secondary surface, e.g. a selected nav item
    card: string; // entity card background
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    onAccent: string; // text color placed on top of an accent-filled element
    buttonlight: string; // for light-on-dark buttons in dark fantasy theme
  };
  accent: {
    primary: string; // the theme's signature color — active nav, headings
    secondary: string; // warm highlight — primary action buttons
    tertiary: string; // a third accent for tags/badges/variety
    quartenary?: string;
  };
  semantic: {
    danger: string; // "cursed" / antagonist-style tags
    success: string;
  };
  border: {
    default: string;
    light?: string;
    strong: string;
  };
}

// ----- Typography tokens -------------------------------------------------------

export interface FontTokens {
  display: string; // headings, titles, brand name
  body: string; // paragraph and UI text
  displayWeight: number;
  letterSpacingDisplay: string; // fantasy/literary lean wide, romance tight
}

// ----- Shape tokens --------------------------------------------------------------
// Captures the sharp-vs-soft structural difference between themes — this is
// NOT a color choice, components must read radius/shape from here too.

export interface ShapeTokens {
  radiusSm: number; // chips, small buttons
  radiusMd: number; // inputs, nav items
  radiusLg: number; // cards, panels
  pillNav: boolean; // true = rounded pill view-toggle (romance), false = sharp tabs
  decorative: "ornate" | "soft" | "ledger"; // which decorative chrome to apply
}

// ----- Vocabulary -------------------------------------------------------------------
// The copy layer. Components render vocabulary.entityLabels.character, never
// the literal word "Character" — this is what makes the three themes feel
// like different products instead of the same UI in different colors.

export interface EntityLabels {
  character: string;
  location: string;
  faction: string;
  item: string;
  concept: string;
  event: string;
}

export interface VocabularyTokens {
  appName: string;
  worldSubtitle: string;
  worldLabel: string; // "Realm" / "Novel" / "Manuscript"
  worldLabelPlural: string;
  entityLabels: EntityLabels;
  entityLabelsPlural: EntityLabels;
  relationshipCountLabel: string; // "bonds" / "references"
  primaryActionLabel: string; // "Summon" / "Compose"
  editActionLabel: string; // "Inscribe" / "Edit"
  detailPanelTitle: string; // "Grimoire" / "Dossier"
  connectionsLabel: string;
  graphLabel: string;
  timelineLabel: string;
  emptyTitle: EntityLabels;
  emptySubtitle: EntityLabels;
  arcOneSubtitle: string;
  arcTwoSubtitle: string;
  arcThreeSubtitle: string;
}

// ----- Full theme definition ----------------------------------------------------------

export interface Theme {
  id: ThemeId;
  name: string;
  colors: ColorTokens;
  fonts: FontTokens;
  shape: ShapeTokens;
  vocabulary: VocabularyTokens;
}

// ----- Concrete theme: dark fantasy ----------------------------------------------------

export const darkFantasyTheme: Theme = {
  id: "dark-fantasy",
  name: "Dark fantasy",
  colors: {
    bg: {
      base: "#0e0c0a",
      surface: "#181410",
      surfaceAlt: "#2e2820",
      card: "#221e18",
    },
    text: {
      primary: "#e8d5a8",
      secondary: "#6a6058",
      muted: "#8a7248",
      onAccent: "#0e0c0a",
      buttonlight: "#f4f0e8",
    },
    accent: { primary: "#c8a96e", secondary: "#b85c1a", tertiary: "#7aa8c4" },
    semantic: { danger: "#8b2020", success: "#7aa8c4" },
    border: {
      default: "#c8a96e4d",
      light: "rgba(200,169,110,0.12)",
      strong: "rgba(200,169,110,0.3)",
    },
  },
  fonts: {
    display: "'Cinzel', serif",
    body: "'Crimson Pro', serif",
    displayWeight: 500,
    letterSpacingDisplay: "0.1em",
  },
  shape: {
    radiusSm: 0,
    radiusMd: 0,
    radiusLg: 4,
    pillNav: false,
    decorative: "ornate",
  },
  vocabulary: {
    appName: "Loresmith",
    worldSubtitle: "Chronicle of worlds",
    worldLabel: "Realm",
    worldLabelPlural: "Realms",
    entityLabels: {
      character: "Soul",
      location: "Place",
      faction: "Order",
      item: "Relic",
      concept: "Lore",
      event: "Annal",
    },
    entityLabelsPlural: {
      character: "Souls & heroes",
      location: "Places",
      faction: "Orders & Factions",
      item: "Relics",
      concept: "Lore & Prophecies",
      event: "Annals of Time",
    },
    relationshipCountLabel: "bonds",
    primaryActionLabel: "Summon",
    editActionLabel: "Inscribe",
    detailPanelTitle: "Grimoire",
    connectionsLabel: "Bonds",
    graphLabel: "Web",
    timelineLabel: "Annals of Time",
    emptyTitle: {
      character: "No souls inscribed yet",
      location: "No realms recorded",
      faction: "No orders exist yet",
      item: "No artefacts unearthed",
      concept: "The annals are silent",
      event: "The annals hold no record",
    },
    emptySubtitle: {
      character:
        "The world breathes, but no one walks it yet. Summon the first.",
      location:
        "Every empire begins with a single place. Where does yours start?",
      faction: "Power abhors a vacuum. Who will rise to fill it?",
      item: "Somewhere in the dark, something waits to be found.",
      concept: "History is written by those who survive. Write yours first.",
      event: "Every age begins with a single event. What started yours?",
    },
    arcOneSubtitle: "Where do we meet them? What is their lie or false belief?",
  arcTwoSubtitle: "What forces them to question who they are?",
  arcThreeSubtitle: "Who do they become? What do they accept or reject?",
  },
};

// ----- Concrete theme: romance ----------------------------------------------------------

export const romanceTheme: Theme = {
  id: "romance",
  name: "Romance",
  colors: {
    bg: {
      base: "#fdf6ee",
      surface: "#faf5f0",
      surfaceAlt: "#f2d4d0",
      card: "#faf5f0",
    },
    text: {
      primary: "#3d2530",
      secondary: "#9a7282",
      muted: "#c4a8b2",
      onAccent: "#ffffff",
      buttonlight: "#3d2530",
    },
    accent: {
      primary: "#b85470",
      secondary: "#c49a5a",
      tertiary: "#9b7ea0",
      quartenary: "#f7e4ea",
    },
    semantic: { danger: "#8c3a52", success: "#9b7ea0" },
    border: {
      default: "rgba(184,84,112,0.18)",
      strong: "rgba(217,160,154,0.3)",
    },
  },
  fonts: {
    display: "'Cormorant Garamond', serif",
    body: "'Jost', sans-serif",
    displayWeight: 400,
    letterSpacingDisplay: "0.04em",
  },
  shape: {
    radiusSm: 8,
    radiusMd: 16,
    radiusLg: 20,
    pillNav: true,
    decorative: "soft",
  },
  vocabulary: {
    appName: "Loresmith",
    worldSubtitle: "Stories of the heart",
    worldLabel: "Novel",
    worldLabelPlural: "Novels",
    entityLabels: {
      character: "Lead",
      location: "Setting",
      faction: "Circle",
      item: "Keepsake",
      concept: "Trope",
      event: "Moment",
    },
    entityLabelsPlural: {
      character: "Leads & love interests",
      location: "Settings & places",
      faction: "Circles",
      item: "Keepsakes",
      concept: "Tropes",
      event: "Moments",
    },
    relationshipCountLabel: "bonds",
    primaryActionLabel: "Compose",
    editActionLabel: "Edit",
    detailPanelTitle: "Detail",
    connectionsLabel: "Bonds",
    graphLabel: "Web",
    timelineLabel: "Moments",
    emptyTitle: {
      character: "No one has walked in yet",
      location: "No settings written yet",
      faction: "No rivals or allies yet",
      item: "No tokens or keepsakes yet",
      concept: "No tropes defined",
      event: "No story arc mapped",
    },
    emptySubtitle: {
      character:
        "Every great love story begins with a door opening. Who comes through yours?",
      location:
        "The right place changes everything. Where does your story unfold?",
      faction:
        "Every love story needs something standing in the way. What is yours?",
      item: "The pressed flower, the letter, the borrowed coat. What does your story leave behind?",
      concept:
        "Slow burn? Enemies to lovers? Second chance? What is the shape of this love?",
      event: "Act one: they meet. The rest is yours to write.",
    },
    arcOneSubtitle: "Where we meet them. What is the lie they believe about love?",
  arcTwoSubtitle: "What forces them to feel again despite themselves?",
  arcThreeSubtitle: "What do they ultimately choose — love or safety?",
  },
};

// ----- Concrete theme: literary / historical ----------------------------------------------

export const literaryHistoricalTheme: Theme = {
  id: "literary-historical",
  name: "Literary / historical",
  colors: {
    bg: {
      base: "#f4f0e8",
      surface: "#2c2c1e",
      surfaceAlt: "#ece6d8",
      card: "#f4f0e8",
    },
    text: {
      primary: "#1a1a14",
      secondary: "#6e6e52",
      muted: "#9a9878",
      onAccent: "#f4f0e8",
      buttonlight: "#f4f0e8",
    },
    accent: { primary: "#8c6d2a", secondary: "#2a4a35", tertiary: "#6b2d3a" },
    semantic: { danger: "#6b2d3a", success: "#2a4a35" },
    border: { default: "rgba(26,26,20,0.15)", strong: "rgba(26,26,20,0.25)" },
  },
  fonts: {
    display: "'Playfair Display', serif",
    body: "'Source Serif 4', serif",
    displayWeight: 400,
    letterSpacingDisplay: "0.05em",
  },
  shape: {
    radiusSm: 0,
    radiusMd: 0,
    radiusLg: 2,
    pillNav: false,
    decorative: "ledger",
  },
  vocabulary: {
    appName: "Loresmith",
    worldSubtitle: "Historical narratives",
    worldLabel: "Manuscript",
    worldLabelPlural: "Manuscripts",
    entityLabels: {
      character: "Personage",
      location: "Locale",
      faction: "Institution",
      item: "Artifact",
      concept: "Doctrine",
      event: "Entry",
    },
    entityLabelsPlural: {
      character: "Personages",
      location: "Locales & settings",
      faction: "Institutions",
      item: "Artifacts",
      concept: "Doctrines",
      event: "Chronology",
    },
    relationshipCountLabel: "references",
    primaryActionLabel: "Compose",
    editActionLabel: "Edit",
    detailPanelTitle: "Dossier",
    connectionsLabel: "References",
    graphLabel: "Index",
    timelineLabel: "Chronology",
    emptyTitle: {
      character: "No personages recorded",
      location: "No locales catalogued",
      faction: "No institutions entered",
      item: "No artefacts in the record",
      concept: "The archive is empty",
      event: "The chronicle is unwritten",
    },
    emptySubtitle: {
      character:
        "Every great novel is populated by people who feel utterly real. Who is the first?",
      location:
        "A story without a place is a rumour. Establish where this world exists.",
      faction:
        "Power in this period moves through rooms and committees. Which ones matter here?",
      item: "Every object carries a history. What does this world leave behind?",
      concept:
        "Every footnote began as a question. What are you trying to verify?",
      event:
        "History does not arrange itself. Someone must decide what happened first.",
    },
    arcOneSubtitle: "Where do we find them? What is their position at the story's start?",
  arcTwoSubtitle: "What disrupts their world and sets the plot in motion?",
  arcThreeSubtitle: "Where do they end? What has changed — in them or in their world?",
  },
};

export const themes: Record<ThemeId, Theme> = {
  "dark-fantasy": darkFantasyTheme,
  romance: romanceTheme,
  "literary-historical": literaryHistoricalTheme,
};

// ----- CSS variable emission ----------------------------------------------------------------
// Called once per theme switch. Writes the active theme's tokens onto :root
// as CSS variables, so every styled component just reads var(--color-text-primary)
// etc and never imports the theme object directly.

export function applyThemeToDocument(theme: Theme): void {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.id);
  root.setAttribute("data-decorative", theme.shape.decorative);

  root.style.setProperty("--color-bg-base", theme.colors.bg.base);
  root.style.setProperty("--color-bg-surface", theme.colors.bg.surface);
  root.style.setProperty("--color-bg-surface-alt", theme.colors.bg.surfaceAlt);
  root.style.setProperty("--color-bg-card", theme.colors.bg.card);

  root.style.setProperty("--color-text-primary", theme.colors.text.primary);
  root.style.setProperty("--color-text-secondary", theme.colors.text.secondary);
  root.style.setProperty("--color-text-muted", theme.colors.text.muted);
  root.style.setProperty("--color-text-on-accent", theme.colors.text.onAccent);
  root.style.setProperty(
    "--color-text-buttonlight",
    theme.colors.text.buttonlight,
  );
  root.style.setProperty("--color-accent-primary", theme.colors.accent.primary);
  root.style.setProperty(
    "--color-accent-secondary",
    theme.colors.accent.secondary,
  );
  root.style.setProperty(
    "--color-accent-tertiary",
    theme.colors.accent.tertiary,
  );

  root.style.setProperty("--color-danger", theme.colors.semantic.danger);
  root.style.setProperty("--color-success", theme.colors.semantic.success);

  root.style.setProperty("--color-border", theme.colors.border.default);
  root.style.setProperty("--color-border-strong", theme.colors.border.strong);

  root.style.setProperty("--font-display", theme.fonts.display);
  root.style.setProperty("--font-body", theme.fonts.body);
  root.style.setProperty(
    "--font-display-weight",
    String(theme.fonts.displayWeight),
  );
  root.style.setProperty(
    "--letter-spacing-display",
    theme.fonts.letterSpacingDisplay,
  );

  root.style.setProperty("--radius-sm", `${theme.shape.radiusSm}px`);
  root.style.setProperty("--radius-md", `${theme.shape.radiusMd}px`);
  root.style.setProperty("--radius-lg", `${theme.shape.radiusLg}px`);
  root.style.setProperty("--nav-pill", theme.shape.pillNav ? "1" : "0");
}

// ----- React context + provider -----------------------------------------------------------

interface ThemeContextValue {
  theme: Theme;
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  initialThemeId = "dark-fantasy",
}: {
  children: ReactNode;
  initialThemeId?: ThemeId;
}) {
  const [themeId, setThemeId] = useState<ThemeId>(initialThemeId);
  const theme = themes[themeId];

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Use this for colors/fonts (already on CSS vars, but handy for JS logic)
// and ALWAYS for vocabulary, since copy can't be expressed as a CSS variable.
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
