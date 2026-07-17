import { Field } from "../character-sections/Field";
import type { SectionProps } from "./types";
import { useTheme } from "../../theme/theme";
import { ATMOSPHERE_FIELDS_BY_THEME } from "./AtmosphereFieldsByTheme";
import { Fieldtwo } from "../character-sections/Fieldtwo";

export function AtmosphereSection({ draft, onChange }: SectionProps) {
  const updateAtmosphere = (
    key: keyof NonNullable<typeof draft.atmosphere>,
    value: string,
  ) => {
    onChange("atmosphere", { ...draft.atmosphere, [key]: value });
  };

  const themeId = useTheme().themeId;
  const mood = [
    "Warm & safe",
    "Intimate & quiet",
    "Magical & dreamy",
    "Charged & tense",
    "Melancholy",
    "Lively & bright",
    "Private & secret",
    "Unsettling",
  ];
  const fields = ATMOSPHERE_FIELDS_BY_THEME[themeId] as Array<{
    key: keyof NonNullable<typeof draft.atmosphere>;
    label: string;
    placeholder: string;
  }>;

  return (
    <section className="flex flex-col gap-3">
      {themeId === "romance" && (
        <>
          <p className="uppercase text-text-secondary text-[10px] tracking-widest">
            Overall Mood
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3">
            {mood.map((m) => {
              const isActive = draft.atmosphere?.mood === m;
              return (
                <div
                key={m}
                onClick={() => {
                (updateAtmosphere("mood", m));
              }}
                  className={`border rounded-sm p-3 text-text-primary/90 text-sm cursor-pointer   ${isActive ? "bg-bg-surface-alt border-accent-primary text-accent-primary" : "bg-bg-card border-border"}`}
                >
                  {m}
                </div>
              );
            })}
          </div>
        </>
      )}
      <Field
        label="Description"
        richtext
        value={draft.atmosphere?.description ?? ""}
        onChange={(v) => updateAtmosphere("description", v)}
      />
      <hr />
      <div className="grid grid-cols-2 gap-3">
        {fields.map((field) => (
        <Fieldtwo
          key={field.key}
          label={field.label}
          placeholder={field.placeholder}
          value={draft.atmosphere?.[field.key] ?? ""}
          onChange={(val) => updateAtmosphere(field.key, val)}
        />
      ))}
      </div>
    </section>
  );
}
