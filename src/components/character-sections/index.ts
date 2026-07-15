import { IconUser, IconEye, IconHeart, IconRoute, IconWorld, IconLock, IconNotes } from '@tabler/icons-react';
import { IdentitySection } from './IdentitySection';
// import the rest as you build them:
import { AppearanceSection } from './AppearanceSection';
import { PersonalitySection } from './PersonalitySection';
import { ArcSection } from './ArcSection';
import { WorldTiesSection } from './WorldTiesSection';
import { SecretsSection } from './SecretsSection';
import { WriterNotesSection } from './WriterNotesSection';
import { ViewProfile } from './ViewProfile';
import { ViewArc } from './ViewArc';
import { ViewSecrets } from './ViewSecrets';
import { ViewNotes } from './ViewNotes';
import { ViewWorldTies } from './ViewWorldTies';

export const CHARACTER_SECTIONS = [
  { id: 'identity' as const, label: 'Identity', icon: IconUser, Component: IdentitySection },
  { id: 'appearance' as const, label: 'Appearance', icon: IconEye, Component: AppearanceSection },
  { id: 'character' as const, label: 'Personality', icon: IconHeart, Component: PersonalitySection },
  { id: 'arc' as const, label: 'Story Arc', icon: IconRoute, Component: ArcSection },
  { id: 'worldTies' as const, label: 'World Ties', icon: IconWorld, Component: WorldTiesSection },
  { id: 'secrets' as const, label: 'Secrets', icon: IconLock, Component: SecretsSection },
  { id: 'writerNotes' as const, label: "Writer's Notes", icon: IconNotes, Component: WriterNotesSection },
];

export const VIEW_CHARACTER_SECTIONS = [
  { id: 'profile' as const, label: 'Profile', Component: ViewProfile },
  { id: 'arc' as const, label: 'Story Arc', Component: ViewArc },
  { id: 'worldTies' as const, label: 'World Ties', Component: ViewWorldTies },
  { id: 'secrets' as const, label: 'Secrets', Component: ViewSecrets },
  { id: 'writerNotes' as const, label: "Writer's Notes", Component: ViewNotes },
];

export type { SectionProps } from './types';
export type { ViewSectionProps } from './types';