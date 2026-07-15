import type { ViewSectionProps } from "./types";

export function ViewSecrets({ draft }: ViewSectionProps) {
  return (
    <div className="flex flex-col gap-8">

      <div>
        <h5>Hidden Truth</h5>
        <hr />
        <p className="text-sm text-text-secondary">
          {draft.secrets?.hiddenTruth || "None"}
        </p>
      </div>

      <div>
        <h5>Planned Reveal</h5>
        <hr />
        <p className="text-sm text-text-secondary">
          {draft.secrets?.plannedReveal || "None"}
        </p>
      </div>

      <div>
        <h5>Secret Motive</h5>
        <hr />
        <p className="text-sm text-text-secondary">
          {draft.secrets?.secretMotive || "None"}
        </p>
      </div>

      
    </div>
  );
}
