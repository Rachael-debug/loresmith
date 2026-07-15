// import { useTheme } from "../../theme/theme";
import type { ViewSectionProps } from "./types";

export function ViewArc({ draft }: ViewSectionProps) {
//   const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-3">
      
      <div className={` detail p-4 border rounded-sm  cursor-pointer  `}>
        <h5 >
        Arc Type
      </h5>
        <p>{draft.arc?.arcType || "No Arc Type Set"}</p>
      </div>
      <h5 >
        Story beats
      </h5>
        <hr/>
      <div className="border-l border-border flex flex-col gap-4 ml-2">
        <div className="relative gap-2 w-auto">
          <span className="h-2 border border-border bg-accent-quartenary p-1.5 absolute -ml-2"></span>
          <div className="pl-7">
            <h5>Wound</h5>
            <p>{draft.arc?.wound || "Not Set"}</p>
          </div>
        </div>
        <div className="relative gap-2 w-auto">
          <span className="h-2 border border-border bg-accent-quartenary p-1.5 absolute -ml-2"></span>
          <div className="pl-7">
            <h5>Confrontation</h5>
            <p>{draft.arc?.confrontation || "Not Set"}</p>
          </div>
        </div>
        <div className="relative gap-2 w-auto">
          <span className="h-2 border border-border bg-accent-quartenary p-1.5 absolute -ml-2"></span>
          <div className="pl-7">
            <h5>Resolution</h5>
            <p>{draft.arc?.resolution || "Not Set"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
