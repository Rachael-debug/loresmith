import { IconPinFilled } from "@tabler/icons-react";
import { RichTextView } from "../editor/RichTextView";
import type { ViewSectionProps } from "./types";

export function ViewNotes({ draft }: ViewSectionProps) {
  return (
    <div className="flex flex-col gap-8">

      <div>
        <h5 className="flex items-center gap-2">
          <IconPinFilled size={16} /> Note
        </h5>
        <hr />
        <RichTextView content={draft.pinnedNote|| "No Notes available."} />
      </div>

      <div>
        <h5>Free Note</h5>
        <hr />
        <RichTextView content={draft.writerNotes|| "No Notes available."} />
      </div>

      {/* <div>
        <p>Secret Motive</p>
        <hr />
        <p>{draft.secrets?.secretMotive || "None"}</p>
      </div> */}

      
    </div>
  );
}
