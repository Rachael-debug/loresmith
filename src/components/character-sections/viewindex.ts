import { IconUser, IconEye, IconHeart, IconRoute, IconWorld, IconLock, IconNotes } from '@tabler/icons-react';
import { ViewProfile } from './ViewProfile';
import { ArcSection } from './ArcSection';
import { WorldTiesSection } from './WorldTiesSection';
import { SecretsSection } from './SecretsSection';
import { WriterNotesSection } from './WriterNotesSection';

export const VIEW_CHARACTER_SECTIONS = [
  { id: 'profile' as const, label: 'Profile', Component: ViewProfile },
  { id: 'arc' as const, label: 'Story Arc', icon: IconRoute, Component: ArcSection },
  { id: 'worldTies' as const, label: 'World Ties', icon: IconWorld, Component: WorldTiesSection },
  { id: 'secrets' as const, label: 'Secrets', icon: IconLock, Component: SecretsSection },
  { id: 'writerNotes' as const, label: "Writer's Notes", icon: IconNotes, Component: WriterNotesSection },
];

export type { SectionProps } from './types';