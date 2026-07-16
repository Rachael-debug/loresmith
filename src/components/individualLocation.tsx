import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme/theme";
import type {
  AnyEntity,
  Character,
  Faction,
  Location,
  Relationship,
} from "../types/entities";
import { RichTextView } from "./editor/RichTextView";
import { useState, useEffect } from "react";
import { fetchBoundCharacters } from "../db/entities";
import { getInitials } from "../utils/utils";

export default function IndividualLocation({
  location,
  handleDelete,
  worldId,
}: {
  location: Location;
  handleDelete?: () => Promise<void>;
  worldId: string | null;
}) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [boundCharacters, setBoundCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (!worldId ) return;
    // Fetch bound characters for this location

    // Assuming you have a function to fetch characters by location
    fetchBoundCharacters(location.id, worldId).then(setBoundCharacters);
  }, [location.id, worldId]);


  return (
    <div className="sidepanel">
      <div className="head">
        <h4>
          {location.subType || location.locationType} . {location.status}
        </h4>
        <h1>{location.name}</h1>
        <div className="tag-div">
          {location.tags &&
            location.tags.map((tag) => (
              <h6 key={`${location.id}-${tag}`}>{tag}</h6>
            ))}
        </div>
      </div>
      <div className="panelmain pb-20">
        <h5>
          {theme.id === "dark-fantasy" && "Chronicle"}
          {theme.id === "romance" && "Portrait"}
          {theme.id === "literary-historical" && "Location précis"}
        </h5>
        <hr />
        {location.description && (
          <RichTextView
            content={location.description || "No description available"}
          />
        )}
        <div className="details">
          <h5>
            {theme.id === "dark-fantasy" && "Inscriptions"}
            {theme.id === "romance" && "Details"}
            {theme.id === "literary-historical" && "Register"}
          </h5>
          <hr />
          <div className=" grid grid-cols-2 gap-2">
            {theme.id === "dark-fantasy" && (
              <div className="detail">
                <h5>Souls Within</h5>
                <p>~{location.population || "Unknown"}</p>
              </div>
            )}
            <div className="detail">
              <h5>
                {theme.id === "dark-fantasy" && "Region"}
                {theme.id === "romance" && "Town/City"}
                {theme.id === "literary-historical" && "City"}
              </h5>
              <p>{location.region || "Unknown"}</p>
            </div>

            <div className="detail">
              <h5>
                {theme.id === "dark-fantasy" && "Ruled by"}
                {theme.id === "romance" && "Owned by"}
                {theme.id === "literary-historical" && "Ownership"}
              </h5>
              <p>{location.ownedBy || "Unknown"}</p>
            </div>

            {(theme.id === "dark-fantasy" || theme.id === "romance") && (
              <div className="detail">
                <h5>Era</h5>
                <p>{location.history?.era || "Unknown"}</p>
              </div>
            )}

            {theme.id === "romance" && (
              <div className="detail">
                <h5>Romantic Role</h5>
                <p>{location.romanticRole?.role || "Unknown"}</p>
              </div>
            )}

            {theme.id === "literary-historical" && (
              <>
                <div className="detail">
                  <h5>Period</h5>
                  <p>{location.society?.period || "Unknown"}</p>
                </div>
                <div className="detail">
                  <h5>Social Class</h5>
                  <p>{location.society?.socialClass || "Unknown"}</p>
                </div>
              </>
            )}
          </div>
          <div className="details">
            <h5>
              {theme.id === "dark-fantasy" && "Bound Souls and Order"}
              {theme.id === "romance" && "Hearts & Connections"}
              {theme.id === "literary-historical" &&
                "Associations & Institutions"}
            </h5>
            <hr />
            {boundCharacters.length < 1 ? (
              <p>No characters bound to this location.</p>
            ) : (
              <ol className="flex flex-col gap-1">
                {boundCharacters.map((char) => (
                  <li key={char.id} className="flex items-center rounded-sm border border-border bg-bg-card px-2 py-2 text-sm">
                  
                      <span className={`border border-accent-secondary text-accent-secondary  p-2 rounded-sm   mr-2`}>
                        {getInitials({ name: char.name })} 
                      </span>
                      <span className="flex flex-col">
                        {char.name}
                        <span className="text-text-secondary capitalize italic">
                          {char.occupation || "None"}
                        </span>
                      </span>
                    
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
