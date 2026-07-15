import type { Character } from '../../types/entities';

export interface SectionProps {
  draft: Partial<Character>;
  onChange: <K extends keyof Character>(field: K, value: Character[K]) => void;
  characterId: string | null;
  worldId: string;
}
export interface ViewSectionProps {
  draft: Partial<Character>;
  characterId: string | null;
  worldId: string;
}