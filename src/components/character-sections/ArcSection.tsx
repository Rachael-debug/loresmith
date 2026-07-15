import { useTheme } from "../../theme/theme";
import { Field } from "./Field";
import type { SectionProps } from "./types";

export function ArcSection({ draft, onChange }: SectionProps) {
  const { theme } = useTheme();
  const updateArc = (
    key: keyof NonNullable<typeof draft.arc>,
    value: string,
  ) => {
    onChange("arc", { ...draft.arc, [key]: value });
  };

  const arctype = [
    "positive",
    "negative",
    "flat",
    // "Transformative"
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="uppercase text-text-secondary text-[10px] tracking-widest">
        Arc Type
      </p>
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 ">
        {arctype.map((l) => {
          const isActive = draft.arc?.arcType === l;
          return (
            <div
              key={l}
              onClick={() => {
                updateArc("arcType", l);
              }}
              className={` p-4 border rounded-sm  cursor-pointer  ${isActive ? "bg-bg-surface-alt border-accent-primary text-accent-primary" : "bg-bg-card border-border"}`}
            >
              {theme.id === "romance" && (
                <>
                  {l === "positive" && (
                    <>
                      <h1>Opens up</h1>
                      <p className="italic text-[10px] text-text-secondary">
                        Learns to trust & love again
                      </p>
                    </>
                  )}
                  {l === "negative" && (
                    <>
                      <h1>Stays guarded</h1>
                      <p className="italic text-[10px] text-text-secondary">
                        Growth without full surrender
                      </p>
                    </>
                  )}
                  {l === "flat" && (
                    <>
                      <h1>Transforms the world</h1>
                      <p className="italic text-[10px] text-text-secondary">
                        Don't change, the world does.
                      </p>
                    </>
                  )}
                </>
              )}
              {theme.id === "dark-fantasy" && (
                <>
                  {l === "positive" && (
                    <>
                      <h1>Positive arc</h1>
                      <p className="italic text-[10px] text-text-secondary">
                        Growth & redemption
                      </p>
                    </>
                  )}
                  {l === "negative" && (
                    <>
                      <h1>Negative Arc</h1>
                      <p className="italic text-[10px] text-text-secondary">
                        Corruption & fall
                      </p>
                    </>
                  )}
                  {l === "flat" && (
                    <>
                      <h1>Flat arc</h1>
                      <p className="italic text-[10px] text-text-secondary">
                        The world changes, not them
                      </p>
                    </>
                  )}
                </>
              )}
              {theme.id === "literary-historical" && (
                <>
                  {l === "positive" && (
                    <>
                      <h1>Revelation arc</h1>
                      <p className="italic text-[10px] text-text-secondary">
                        Truth uncovered changes everything
                      </p>
                    </>
                  )}
                  {l === "negative" && (
                    <>
                      <h1>Tragedy arc</h1>
                      <p className="italic text-[10px] text-text-secondary">
                        Undone by circumstance or flaw
                      </p>
                    </>
                  )}
                  {l === "flat" && (
                    <>
                      <h1>Witness arc</h1>
                      <p className="italic text-[10px] text-text-secondary">
                        Observes and records the world
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      <p className="uppercase text-text-secondary text-[10px] tracking-widest mt-3">
        Story beats
      </p>

      <div className="border-l border-border flex flex-col gap-4 ml-2">
        <div className="relative gap-2 w-auto">
          <span className="h-2 border border-border bg-accent-quartenary p-1.5 absolute -ml-2"></span>
          <div className="pl-7">
            <Field
              label="act one - the wound"
              value={draft.arc?.wound ?? ""}
              onChange={(v) => updateArc("wound", v)}
              placeholder={theme.vocabulary.arcOneSubtitle}
            />
          </div>
        </div>
        <div className="relative gap-2 w-auto">
          <span className="h-2 border border-border bg-accent-quartenary p-1.5 absolute -ml-2"></span>
          <div className="pl-7">
            <Field
              label="act two - confrontation . now"
              value={draft.arc?.confrontation ?? ""}
              onChange={(v) => updateArc("confrontation", v)}
              placeholder={theme.vocabulary.arcTwoSubtitle}
            />
          </div>
        </div>
        <div className="relative gap-2 w-auto">
          <span className="h-2 border border-border bg-accent-quartenary p-1.5 absolute -ml-2"></span>
          <div className="pl-7">
            <Field
              label="act three - resolution"
              value={draft.arc?.resolution ?? ""}
              onChange={(v) => updateArc("resolution", v)}
              placeholder={theme.vocabulary.arcThreeSubtitle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
