import { useState, type KeyboardEvent } from "react";
import { Field } from "../character-sections/Field";
import type { SectionProps } from "./types";
import { useTheme } from "../../theme/theme";
import { IDENTITY_ROWS_BY_THEME } from "./identityFieldsByTheme";

export function IdentitySection({ draft, onChange }: SectionProps) {
  const [tagInput, setTagInput] = useState("");
  const {theme} = useTheme();

  const rows = IDENTITY_ROWS_BY_THEME[theme.id];

  const tags = Array.isArray(draft.tags) ? draft.tags : [];

  function addTag(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;

    const nextTag = trimmed.replace(/,/g, "").trim();
    if (!nextTag) return;

    const nextTags = tags.includes(nextTag) ? tags : [...tags, nextTag];

    onChange("tags", nextTags);
    setTagInput("");
  }

  function removeTag(tagToRemove: string) {
    onChange(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
    );
  }

  function handleTagKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(tagInput);
      return;
    }

    if (
      event.key === "Backspace" &&
      tagInput.trim() === "" &&
      tags.length > 0
    ) {
      event.preventDefault();
      removeTag(tags[tags.length - 1]);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, i) => (
        <div key={i} className={`grid grid-cols-${row.columns} gap-3`}>
          {row.fields.map((field) => (
            <Field
              key={field.key}
              label={field.label}
              hint={field.hint}
              placeholder={field.placeholder}
              value={(draft[field.key as keyof typeof draft] as string) ?? ""}
              onChange={(val) => onChange(field.key as keyof typeof draft, val)}
            />
          ))}
        </div>
      ))}
      <Field
        label="One-line description"
        value={draft.oneLiner ?? ""}
        onChange={(v) => onChange("oneLiner", v)}
        placeholder="How would a traveller describe this place in a single sentence?"
      />
      <label className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-widest text-text-secondary">
          Tags
        </span>
        <div
          className={`rounded-sm border border-border ${theme.id === "literary-historical" ? "bg-bg-surface-alt" : "bg-bg-surface"} px-2 py-2 text-sm text-text-primary`}
        >
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => removeTag(tag)}
                className="flex items-center gap-1 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-2.5 py-1 text-[11px] text-accent-primary"
              >
                <span>{tag}</span>
                <span className="text-[10px]">×</span>
              </button>
            ))}
            <input
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder={
                tags.length > 0
                  ? "Add another tag"
                  : "Add a tag. Press enter to add"
              }
              className="min-w-32 flex-1 border-none bg-transparent outline-none placeholder:text-text-secondary"
            />
          </div>
        </div>
      </label>
    </div>
  );
}
