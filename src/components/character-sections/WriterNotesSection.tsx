import { Field } from "./Field";
import type { SectionProps } from "./types";

export function WriterNotesSection({ draft, onChange }: SectionProps) {

  return (
    <div className="flex flex-col gap-3">
        
      
      <Field
        label="Free note"
        richtext
        value={draft.writerNotes ?? ""}
        onChange={(v) => onChange("writerNotes", v)}
        placeholder="Anything goes here - Inspiration, research, unanswered questions, ideas "
      />
      <Field
        label="Pinned note"
        richtext
        value={draft.pinnedNote ?? ""}
        onChange={(v) => onChange("pinnedNote", v)}
        placeholder="Anything goes here - Inspiration, research, unanswered questions, ideas "
      />
      <Field
        label="Inspiration & references"
        value={Array.isArray(draft.referenceLinks) ? draft.referenceLinks.join(", ") : draft.referenceLinks ?? ""}
        onChange={(v) => onChange("referenceLinks", v.split(',').map((t) => t.trim()).filter(Boolean))}
        placeholder="Paste urls to reference images, mood boards, research.."
      />
    </div>
  );
}
