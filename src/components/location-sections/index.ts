import {
  IconCategory,
  IconMapPin,
  IconClock,
  IconWind,
  IconUsers,
  IconTimeline,
  IconMap,
  IconLock,
  IconNotes,
  IconHeart,
  IconMovie,
  IconBuildingBank,
  IconBooks,
  type Icon,
} from "@tabler/icons-react";

// Shared sections (used across all themes)
import { LocationTypeSection } from "./LocationTypeSection";
import { IdentitySection } from "./IdentitySection";
import { AtmosphereSection } from "./AtmosphereSection";
import type { ThemeId } from "../../types/entities";
import type { ComponentType } from "react";
import type { SectionProps } from "./types";

export interface SectionConfig {
  id: string;
  label: string;
  icon: Icon;
  desc: string;
  Component: ComponentType<SectionProps>;
}

export const LOCATION_SECTIONS_BY_THEME: Record<ThemeId, SectionConfig[]> = {
  "dark-fantasy": [
    {
      id: "type",
      label: "Location Type",
      icon: IconCategory,
      desc: "What kind of place is this in the world?",
      Component: LocationTypeSection,
    },
    {
      id: "identity",
      label: "Identity",
      icon: IconMapPin,
      desc: "The role, and basic facts of this place.",
      Component: IdentitySection,
    },
    {
      id: "atmosphere",
      label: "Atmosphere",
      icon: IconWind,
      desc: "How this place feels — the sensory and emotional texture of being here.",
      Component: AtmosphereSection,
    },
  ],
  romance: [
    {
      id: "type",
      label: "Setting Type",
      icon: IconCategory,
      desc: "What kind of place does this story unfold in?",
      Component: LocationTypeSection,
    },
    {
      id: "identity",
      label: "Identity",
      icon: IconMapPin,
      desc: "The location, and basic details of this setting.",
      Component: IdentitySection,
    },
    {
      id: "atmosphere",
      label: "Atmosphere",
      icon: IconWind,
      desc: "How this place feels — through all the senses.",
      Component: AtmosphereSection,
    },
  ],
  "literary-historical": [
    {
      id: "type",
      label: "Locale Type",
      desc: "What kind of place does your story unfold within?",
      icon: IconCategory,
      Component: LocationTypeSection,
    },
    {
      id: "identity",
      label: "Identity",
      icon: IconMapPin,
      desc: "The address, and essential facts of this locale.",
      Component: IdentitySection,
    },
    {
      id: "atmosphere",
      label: "Atmosphere",
      icon: IconWind,
      desc: "The sensory and social texture of being here — what a character notices upon entering.",
      Component: AtmosphereSection,
    },
  ],
};
