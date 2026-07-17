import type { ThemeId } from "../../types/entities";
// identityFieldsByTheme.ts
export interface AtmosphereField {
  key: keyof Location | string;   // maps to your Location type
  label: string;
  placeholder?: string;               // the helper text under the field
  optional?: boolean;
  type?: 'text' | 'textarea';
}

export const ATMOSPHERE_FIELDS_BY_THEME: Record<ThemeId, AtmosphereField[]> = {
  'dark-fantasy': [
    { key: 'climate', label: 'Climate / weather', placeholder:"e.g. Perpetual ash-fall…" },
    { key: 'lightQuality', label: 'Light quality', placeholder:"e.g. Dim, ochre-tinged…"},
    { key: 'dominantSound', label: 'Dominant sound', placeholder:"e.g. Distant forge hammers…" },
    { key: 'dominantSmell', label: 'Notable smell', placeholder:"e.g. Sulphur and cold stone…"},
    { key: 'mood', label: 'Mood / feeling', placeholder:"e.g. Oppressive, watchful…" },
    { key: 'dangerLevel', label: 'Danger level', placeholder:"e.g. High, Extreme…" },
  ],

  romance: [
    { key: 'lightQuality', label: 'Light quality', placeholder:"e.g. Golden afternoon, dim lamplight…"},
    { key: 'dominantSound', label: 'Sound', placeholder:"e.g. Distant music, quiet hum…" },
    { key: 'dominantSmell', label: 'Dominant scent', placeholder:"e.g. Sulphur and cold stone…"},
     { key: 'temperature', label: 'Temperature', placeholder:"e.g. Warm and close, airy…" },
    { key: 'season', label: 'Season best suited to', placeholder:"e.g. Autumn, late summer…" },
    { key: 'timeOfDay', label: 'Time of day', placeholder:"e.g. Dusk, early morning…" },
  ],

  'literary-historical': [
    { key: 'architecture', label: 'Architecture style', placeholder:"e.g. Georgian townhouse, Gothic revival…" },
    { key: 'interior', label: 'Interior / décor', placeholder:"e.g. Dark mahogany, gaslit, overfurnished…"},
    { key: 'dominantSound', label: 'Sound', placeholder:"e.g. Murmured conversation, distant traffic…" },
    { key: 'dominantSmell', label: 'Dominant smell', placeholder:"e.g. Coal smoke, beeswax, damp wool…"},
     { key: 'lightQuality', label: 'Light quality', placeholder:"e.g. Gaslight, candlelit, grey northern light…"},
    { key: 'season', label: 'Season / weather', placeholder:"e.g. London fog, winter damp…" },
  ],
};