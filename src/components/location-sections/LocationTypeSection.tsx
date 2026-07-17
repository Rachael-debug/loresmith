import { useTheme } from "../../theme/theme";
import {
  type SectionProps,
  FANTASY_LOCATION_TYPES,
  ROMANCE_LOCATION_TYPES,
  HISTORICAL_LOCATION_TYPES,
} from "./types";
import { Field } from "../character-sections/Field";

export const typeButtonClass =
  "border rounded-sm p-3 text-text-primary/90 text-sm cursor-pointer";

export function LocationTypeSection({ draft, onChange }: SectionProps) {
  const { theme } = useTheme();
  const typeOptions =
    theme.id === "dark-fantasy"
      ? FANTASY_LOCATION_TYPES
      : theme.id === "romance"
        ? ROMANCE_LOCATION_TYPES
        : HISTORICAL_LOCATION_TYPES;

  const selectedType = draft.locationType ?? "";
  const showCustomInput =
    selectedType === "other" ||
    (selectedType !== "" && !typeOptions.some((type) => type.value === selectedType));

  return (
    <div className="flex flex-col gap-3">
      <h5>Type</h5>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {typeOptions.map((type) => {
          const isActive =
            selectedType === type.value ||
            (type.value === "other" && showCustomInput);

          return (
            <div
              key={type.value}
              onClick={() => onChange("locationType", type.value)}
              className={`${typeButtonClass} ${isActive ? "bg-bg-surface-alt border-accent-primary text-accent-primary" : "bg-bg-card border-border"}`}
            >
              <h4>{type.label}</h4>
              <p className="italic text-[10px] text-text-secondary">
                {type.description}
              </p>
            </div>
          );
        })}
      </div>
      {showCustomInput && (
        <div >
          <Field
            label="Custom type"
            value={selectedType === "other" ? "" : selectedType}
            onChange={(value) => onChange("locationType", value)}
            placeholder="Enter a custom location type"
          />
        </div>
      )}

      
      <div>
        <Field
        label="Subtype (optional)"
        value={draft.subType ?? ""}
        onChange={(v) => onChange("subType", v)}
        placeholder="Capital City, Flower Shop..."
      />
        <p className="text-[10px] italic text-text-secondary">Be specific — this appears as the location's label throughout Loresmith.</p>
      </div>

    </div>
  );
}
