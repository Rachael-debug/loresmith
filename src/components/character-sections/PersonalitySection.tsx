import { useTheme } from "../../theme/theme";
import { Field } from "./Field";
import type { SectionProps } from "./types";
import {Fieldtwo} from "./Fieldtwo";

export function PersonalitySection({ draft, onChange }: SectionProps) {
  const { theme } = useTheme();
  const updatePersonality = (
    key: keyof NonNullable<typeof draft.personality>,
    value: string,
  ) => {
    onChange("personality", { ...draft.personality, [key]: value });
  };

  const lovelanguages = [
    "Gifts",
    "Acts of service",
    "Words of affirmation",
    "Quality time",
    "Physical touch",
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        <Fieldtwo
          label="Core personality"
          value={draft.personality?.core ?? ""}
          onChange={(v) => updatePersonality("core", v)}
          placeholder="e.g Pragmatic, guarded"
        />
        <Fieldtwo
          label="Fatal flaw"
          value={draft.personality?.fatalFlaw ?? ""}
          onChange={(v) => updatePersonality("fatalFlaw", v)}
          placeholder="e.g Pride, distrust"
        />
        <Fieldtwo
          label="Greatest Desire"
          value={draft.personality?.greatestDesire ?? ""}
          onChange={(v) => updatePersonality("greatestDesire", v)}
          placeholder="What do they want most?"
        />
        <Fieldtwo
          label="Greatest fear"
          value={draft.personality?.greatestFear ?? ""}
          onChange={(v) => updatePersonality("greatestFear", v)}
          placeholder="What terrifies them?"
        />
        {theme.id !== "dark-fantasy" ? (
          <>
            <Fieldtwo
              label="How they hide pain"
              value={draft.personality?.hidesEmotionsBy ?? ""}
              onChange={(v) => updatePersonality("hidesEmotionsBy", v)}
              placeholder="e.g Humour, silence"
            />
            <Fieldtwo
              label="How they show love"
              value={draft.personality?.showsLoveBy ?? ""}
              onChange={(v) => updatePersonality("showsLoveBy", v)}
              placeholder="e.g Makes tea, remembers things"
            />
            <p className="border-t pt-5 border-border uppercase text-text-secondary md:col-span-2 text-[10px] tracking-widest">
              Love Language
            </p>
            <div className=" md:col-span-2 inline-grid grid-cols-2 md:grid-cols-5 gap-3 ">
              {lovelanguages.map((l) => {
                const isActive = draft.personality?.loveLanguage === l
                return(
                <div
                  key={l}
                  onClick={() => {
                    updatePersonality("loveLanguage", l);
                  }}
                  className={`text-xs p-4 border rounded-sm  cursor-pointer  ${isActive ? "bg-bg-surface-alt border-accent-primary text-accent-primary" : "bg-bg-card text-text-secondary border-border"}`}
                >
                  {l}
                </div>
              )
              })}
            </div>
          </>
        ) : (
          <>
            <Fieldtwo
              label="Speaks in"
              value={draft.personality?.greatestDesire ?? ""}
              onChange={(v) => updatePersonality("voice", v)}
              placeholder="Voice quality, tone, manner..."
            />
            <Fieldtwo
              label="Moral Alignment"
              value={draft.personality?.greatestFear ?? ""}
              onChange={(v) => updatePersonality("moralAlignment", v)}
              placeholder="e.g Lawful, neutral"
            />
          </>
        )}
      </div>
      <Field
        label="Backstory summary"
        multiline
        value={draft.backstory ?? ""}
        onChange={(v) => onChange("backstory", v)}
        placeholder="What shaped them before the story began? What wound are they carrying?"
      />
    </div>
  );
}
