import type { ThemeId } from "../../types/entities";

// identityFieldsByTheme.ts

export interface IdentityField {
  key: string;                    // maps to your Location type
  label: string;
  placeholder?: string;
  hint?: string;
  optional?: boolean;
  type?: 'text' | 'textarea';
}

export interface IdentityRow {
  columns: 1 | 2 | 3;
  fields: IdentityField[];
}

export const IDENTITY_ROWS_BY_THEME: Record<ThemeId, IdentityRow[]> = {
  'dark-fantasy': [
    {
      columns: 2,
      fields: [
        { key: 'aliases', label: 'Aliases / old names', placeholder: "e.g. Vel'Karath, The Old City…", optional: true },
        { key: 'region', label: 'Region / territory', placeholder: 'Where in the world?' },
      ],
    },
    {
      columns: 3,
      fields: [
        { key: 'population', label: 'Population', placeholder: 'e.g. ~340,000' },
        { key: 'ownedBy', label: 'Ruled by', placeholder: 'e.g. Council, Guild…' },
        { key: 'status', label: 'Status', placeholder: 'e.g. Active, Ruined…' },
      ],
    },
  ],

  romance: [
    {
      columns: 2,
      fields: [
        { key: 'region', label: 'Town / city', placeholder: 'e.g. Halverton, London…' },
        { key: 'era', label: 'Era / period', placeholder: 'e.g. Contemporary, Regency…' },
      ],
    },
    {
      columns: 2,
      fields: [
        { key: 'ownedBy', label: 'Owned / run by', placeholder: 'e.g. Elara Sinclair…' },
        { key: 'neighbourhood', label: 'Neighbourhood / area', placeholder: 'e.g. Halverton high street…' },
      ],
    },
  ],

  'literary-historical': [
    {
      columns: 2,
      fields: [
        { key: 'address', label: 'Street address', placeholder: 'e.g. 14 Grosvenor Square…' },
        { key: 'region', label: 'City / region', placeholder: 'e.g. London, Edinburgh…' },
      ],
    },
    {
      columns: 3,
      fields: [
        { key: 'ownedBy', label: 'Ownership', placeholder: 'Who owns it?' },
        { key: 'status', label: 'Status', placeholder: 'e.g. Active, Abandoned…' },
        { key: 'accessRules', label: 'Access', placeholder: 'e.g. Members only…' },
      ],
    },
  ],
};