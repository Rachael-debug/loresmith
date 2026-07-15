import { RichTextView } from "../editor/RichTextView";
import type { ViewSectionProps } from "./types";

export function ViewProfile({ draft }: ViewSectionProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h5>Description</h5>
        <hr />
        <RichTextView content={draft.description || "No description available."} />
      </div>

      <div>
        <h5>Identity</h5>
        <hr />
        <div className="details grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="detail">
            <h5>Age</h5>
            <p>{draft.age || "No age information available."}</p>
          </div>
          <div className="detail">
            <h5>Gender</h5>
            <p>{draft.gender || "No gender information available."}</p>
          </div>
          <div className="detail">
            <h5>Species</h5>
            <p>{draft.species || "No species information available."}</p>
          </div>
          <div className="detail">
            <h5>Age</h5>
            <p>{draft.age || "No age information available."}</p>
          </div>
        </div>
      </div>

      <div>
        <h5>Character</h5>
        <hr />
        <div className="details grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="detail">
            <h5>Personality</h5>
            <p>{draft.personality?.core || "No personality information available."}</p>
          </div>
          <div className="detail">
            <h5>Fatal Flaw</h5>
            <p>{draft.personality?.fatalFlaw || "No fatal flaw information available."}</p>
          </div>
          <div className="detail">
            <h5>Greatest Desire</h5>
            <p>{draft.personality?.greatestDesire || "No greatest desire information available."}</p>
          </div>
          <div className="detail">
            <h5>Greatest Fear</h5>
            <p>{draft.personality?.greatestFear || "No greatest fear information available."}</p>
          </div>
          <div className="detail">
            <h5>Voice</h5>
            <p>{draft.personality?.voice || "No voice information available."}</p>
          </div>
          <div className="detail">
            <h5>Moral Alignment</h5>
            <p>{draft.personality?.moralAlignment || "No moral alignment information available."}</p>
          </div>
        </div>
      </div>

      <div>
        <h5>Backstory</h5>
        <hr />
        <p>{draft.backstory || "No backstory recorded."}</p>
      </div>

      <div >
        <h5>Appearance</h5>
        <hr />
        <div className="details grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="detail">
            <h5>Build</h5>
            <p>{draft.appearance?.build || "No build information available."}</p>
          </div>
          <div className="detail">
            <h5>Height</h5>
            <p>{draft.appearance?.height || "No height information available."}</p>
          </div>
          <div className="detail">
            <h5>Eyes</h5>
            <p>{draft.appearance?.eyes || "No eye information available."}</p>
          </div>
          <div className="detail">
            <h5>Hair</h5>
            <p>{draft.appearance?.hair || "No hair information available."}</p>
          </div>
          <div className="detail">
            <h5>Distinctive Features</h5>
            <p>{draft.appearance?.distinguishingFeatures || "No distinctive features information available."}</p>
          </div>
          <div className="detail">
            <h5>Physical Description</h5>
            <p>{draft.appearance?.description || "No physical description information available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
