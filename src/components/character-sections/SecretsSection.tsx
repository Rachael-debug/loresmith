import { Field } from "./Field";
import type { SectionProps } from "./types";
import { useTheme } from "../../theme/theme";

export function SecretsSection({ draft, onChange }: SectionProps) {
  const { theme } = useTheme();
  const updateSecrets = (
    key: keyof NonNullable<typeof draft.secrets>,
    value: string,
  ) => {
    onChange("secrets", { ...draft.secrets, [key]: value });
  };

  return (
    <div className="flex flex-col gap-3">
      <Field
        label="Hidden Truth"
        multiline
        value={draft.secrets?.hiddenTruth ?? ""}
        onChange={(v) => updateSecrets("hiddenTruth", v)}
        placeholder="What is the real story beneath the surface?"
      />

      <Field
        label="Planned Reveal"
        multiline
        value={draft.secrets?.plannedReveal ?? ""}
        onChange={(v) => updateSecrets("plannedReveal", v)}
        placeholder="When does the hidden truth get revealed"
      />
      {theme.id !== "dark-fantasy" ? (
        <Field
          label="Secret Want"
          value={draft.secrets?.secretMotive ?? ""}
          onChange={(v) => updateSecrets("secretMotive", v)}
          placeholder="What do they actually want, even if they won't admit it "
        />
      ) : (
        <Field
          label="Secret Motive"
          value={draft.secrets?.secretMotive ?? ""}
          onChange={(v) => updateSecrets("secretMotive", v)}
          placeholder="What are they actually trying to achieve beneath the surface "
        />
      )}

      <Field
        label="Spoiler Notes"
        multiline
        value={draft.secrets?.spoilerNotes ?? ""}
        onChange={(v) => updateSecrets("spoilerNotes", v)}
        placeholder="Future twists, planned reveal or notes to yourself "
      />
    </div>
  );
}
