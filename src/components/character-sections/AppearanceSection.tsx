import { Field } from "./Field";
import type { SectionProps } from "./types";

export function AppearanceSection({ draft, onChange }: SectionProps) {
  const updateAppearance = (
    key: keyof NonNullable<typeof draft.appearance>,
    value: string,
  ) => {
    onChange("appearance", { ...draft.appearance, [key]: value });
  };

  return (
    <div className="flex flex-col gap-3">
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field
          label="Build"
          value={draft.appearance?.build ?? ""}
          onChange={(v) => updateAppearance("build", v)}
          placeholder="e.g Lean, wiry"
        />
        <Field
          label="Height"
          value={draft.appearance?.height ?? ""}
          onChange={(v) => updateAppearance("height", v)}
          placeholder="e.g 5'9"
        />
        <Field
          label="Eyes"
          value={draft.appearance?.eyes ?? ""}
          onChange={(v) => updateAppearance("eyes", v)}
          placeholder="Grey, sharp"
        />
        <Field
          label="Hair"
          value={draft.appearance?.hair ?? ""}
          onChange={(v) => updateAppearance("hair", v)}
          placeholder="Dark, cropped close"
        />
      </div>
      <Field
        label="Distinguishing Features"
        multiline
        value={draft.appearance?.distinguishingFeatures ?? ""}
        onChange={(v) => updateAppearance("distinguishingFeatures", v)}
        placeholder="A faded brand mark on her left wrist "
      />
      <Field
        label="Physical description"
        multiline
        value={draft.appearance?.description ?? ""}
        onChange={(v) => updateAppearance("description", v)}
        placeholder="...moves like someone who has learned to take up less space... "
      />
    </div>
  );
}
