import { useState, type KeyboardEvent } from "react";
import { Field } from "./Field";
import type { SectionProps } from "./types";
import type { Character } from "../../types/entities";
import { useTheme } from "../../theme/theme";

export function IdentitySection({ draft, onChange }: SectionProps) {
  const { theme } = useTheme();
  
  interface Role {
    title: string;
    desc: string;
  }
  const roles: Role[] = [
    { title: "Protagonist", desc: "Central hero or lead" },
    { title: "Antagonist", desc: "Opposing force" },
    { title: "Love Interest", desc: "Romantic connection" },
    { title: "Ally", desc: "Opposing force" },
    { title: "Supporting", desc: "Part of the world" },
  ];

  const [custom, setCustom] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState("");

  const tags = Array.isArray(draft.tags) ? draft.tags : [];

  function addTag(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;

    const nextTag = trimmed.replace(/,/g, "").trim();
    if (!nextTag) return;

    const nextTags = tags.includes(nextTag)
      ? tags
      : [...tags, nextTag];

    onChange("tags", nextTags);
    setTagInput("");
  }

  function removeTag(tagToRemove: string) {
    onChange("tags", tags.filter((tag) => tag !== tagToRemove));
  }

  function handleTagKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(tagInput);
      return;
    }

    if (event.key === "Backspace" && tagInput.trim() === "" && tags.length > 0) {
      event.preventDefault();
      removeTag(tags[tags.length - 1]);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="uppercase text-text-secondary text-[10px] tracking-widest">
        Role
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {roles.map((r) => {
          const isActive = draft.role === r.title;
          return (
            <div
              key={r.title}
              onClick={() => {
                (onChange("role", r.title), setCustom(false));
              }}
              className={`border  rounded-sm p-3 text-text-primary/90 text-sm cursor-pointer   ${isActive ? "bg-bg-surface-alt border-accent-primary text-accent-primary" : "bg-bg-card border-border"}`}
            >
              <h4>{r.title}</h4>
              <p className="italic text-[10px] text-text-secondary">{r.desc}</p>
            </div>
          );
        })}
        <div
          onClick={() => setCustom(true)}
          className={`border border-border rounded-sm p-3 text-text-primary/90 text-sm cursor-pointer bg-bg-surface/30`}
        >
          <h4>Custom</h4>
          <p className="italic text-[10px] text-text-secondary">
            Create custom role
          </p>
        </div>
      </div>
      {custom && (
        <Field
          value={draft.role ?? ""}
          onChange={(v) => onChange("role", v)}
          placeholder="Protagonist, Antagonist, Love interest…"
        />
      )}

      <Field
        label="Description"
        richtext
        value={draft.description ?? ""}
        onChange={(v) => onChange("description", v)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field
          label="Age"
          value={draft.age ?? ""}
          onChange={(v) => onChange("age", v)}
          placeholder="34, Unknown, Ageless…"
        />
        <Field
          label="Gender"
          value={draft.gender ?? ""}
          onChange={(v) => onChange("gender", v)}
        />
        <Field
          label="Species"
          value={draft.species ?? ""}
          onChange={(v) => onChange("species", v)}
        />
      </div>

      <p className="uppercase text-text-secondary text-[10px] tracking-widest">
       Status
      </p>
      <select
        value={draft.status}
        onChange={(e) =>
          onChange("status", e.target.value as Character["status"])
        }
        className="rounded-sm border border-border bg-bg-surface px-2 py-1.5 text-text-primary focus:outline-1 focus:outline-accent-primary"
      >
        <option value="alive">Alive</option>
        <option value="deceased">Deceased</option>
        <option value="unknown">Unknown</option>
      </select>
      <Field
        label="Occupation"
        value={draft.occupation ?? ""}
        onChange={(v) => onChange("occupation", v)}
        placeholder="Commander of the Grey Watch"
      />
      <label className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-widest text-text-secondary">
          Tags
        </span>
        <div className={`rounded-sm border border-border ${theme.id === 'literary-historical' ? 'bg-bg-surface-alt' : 'bg-bg-surface'} px-2 py-2 text-sm text-text-primary`}>
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
              placeholder={tags.length > 0 ? "Add another tag" : "Add a tag. Press enter to add"}
              className="min-w-32 flex-1 border-none bg-transparent outline-none placeholder:text-text-secondary"
            />
          </div>
        </div>
      </label>
    </div>
  );
}
