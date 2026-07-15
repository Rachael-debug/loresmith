import type {
  AnyEntity,
  Character,
  Faction,
  Location,
  Relationship,
} from "../types/entities";
import { useTheme } from "../theme/theme";
import { RichTextView } from "./editor/RichTextView";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  deleteRelationship,
  getAllEntities,
  getEntity,
  getRelationships,
} from "../db/entities";
import { IconPinFilled } from "@tabler/icons-react";
import DeleteDialog from "./DeleteDialog";
import { getInitials } from "../utils/utils";

export default function IndividualCharacter({
  character,
  handleDelete,
  worldId,
}: {
  character: Character;
  handleDelete?: () => Promise<void>;
  worldId: string | null;
}) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [allEntities, setAllEntities] = useState<AnyEntity[]>([]);
  const [faction, setFaction] = useState<Faction>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [homeLocation, setHomeLocation] = useState<Location>();

  useEffect(() => {
    if (!worldId) return;
    getAllEntities(worldId).then(setAllEntities);
    refreshRelationships();
  }, [character.id, worldId]);

  useEffect(() => {
    if (!character.factionId) return;
    getEntity(character.factionId).then((entity) => {
      setFaction(entity as Faction);
    });
  }, [character.factionId]);

  useEffect(() => {
    if (!character.homeLocationId) return;
    getEntity(character.homeLocationId).then((entity) => {
      setHomeLocation(entity as Location);
    });
  }, [character.homeLocationId]);

  async function refreshRelationships() {
    if (!character.id || !worldId) return;
    const all = await getRelationships(worldId);
    setRelationships(
      all.filter(
        (r) => r.sourceId === character.id || r.targetId === character.id,
      ),
    );
  }

  function nameOf(id: string) {
    return allEntities.find((e) => e.id === id)?.name ?? "?";
  }
  function displayLabel(r: Relationship) {
    return r.relationshipType === "custom" && r.label
      ? r.label
      : r.relationshipType;
  }

  async function handleUnlink(id: string) {
    await deleteRelationship(id);
    await refreshRelationships();
  }

  async function confirmDelete() {
    if (!handleDelete) return;
    setShowDeleteConfirm(false);
    await handleDelete();
  }

  return (
    <div className="sidepanel">
      <div className="head">
        <h4>
          {character.role} . {character.status}
        </h4>
        <h1>{character.name}</h1>
        <div className="tag-div">
          {character.tags &&
            character.tags.map((tag) => (
              <h6 key={`${character.id}-${tag}`}>{tag}</h6>
            ))}
        </div>
      </div>
      <div className="panelmain pb-20">
        <h5>
          {theme.id === "dark-fantasy" && "Chronicle"}
          {theme.id === "romance" && "Portrait"}
          {theme.id === "literary-historical" && "Character précis"}
        </h5>
        <hr />
        {character.description && (
          <RichTextView content={character.description} />
        )}
        {character.pinnedNote && (
          <div className="p-3 bg-accent-primary/5 rounded-md border border-border mt-2">
            <h5 className="flex gap-2 items-center">
              <IconPinFilled size={14} /> Note
            </h5>
            <RichTextView content={character.pinnedNote} />
          </div>
        )}
        <div className="details">
          <h5>Details</h5>
          <hr />
          <div className=" grid grid-cols-2 gap-2">
            <div className="detail">
              <h5>Age</h5>
              <p>{character.age || "Not set"}</p>
            </div>
            <div className="detail">
              <h5>Occupation</h5>
              <p>{character.occupation || "None"}</p>
            </div>
            <div className="detail">
              <h5>Gender</h5>
              <p>{character.gender || "Unknown"}</p>
            </div>
            <div className="detail">
              <h5>Specie</h5>
              <p>{character.species || "Unknown"}</p>
            </div>
            <div className="detail">
              <h5>Home Location</h5>
              <p>{homeLocation?.name || "Unknown"}</p>
            </div>
            <div className="detail">
              <h5>{theme.vocabulary.entityLabels.faction}</h5>
              <p>{faction?.name || "None"}</p>
            </div>
          </div>
        </div>
        <div className="details">
          <h5>Bonds</h5>
          <hr />
          {relationships.length < 1 ? (
            <p className="text-sm text-text-secondary italic mt-2">
              No relationships found
            </p>
          ) : (
            <ol className="flex flex-col gap-1">
              {relationships.map((r) => {
                const otherId =
                  r.sourceId === character.id ? r.targetId : r.sourceId;
                return (
                  <li
                    key={r.id}
                    className="flex items-center justify-between rounded-sm border border-border bg-bg-card px-2 py-2 text-sm"
                  >
                    <div className="flex items-center">
                      <span className={`border ${r.targetType === 'character' ? 'border-accent-secondary text-accent-secondary' : 'border-accent-tertiary text-accent-tertiary'}  p-2 rounded-sm   mr-2`}>
                        {getInitials({ name: nameOf(otherId) })}
                      </span>
                      <span className="flex flex-col">
                        {nameOf(otherId)}
                        <span className="text-text-secondary capitalize italic">
                          {displayLabel(r)}
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleUnlink(r.id)}
                      className="text-xs text-text-secondary hover:text-text-primary"
                    >
                      Unlink
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
        <div className="details">
          <h5>Character arc</h5>
          <hr />

          <div className="border-l border-accent-primary flex flex-col gap-4 ml-3 mt-3">
            <div className="relative gap-2 w-auto">
              <span className="h-2 border border-accent-primary bg-accent-quartenary p-1.5 absolute -ml-2"></span>
              <div className="pl-3">
                <h4>Arc one</h4>
                <p>{character.arc?.wound || "Unknown"}</p>
              </div>
            </div>
            <div className="relative gap-2 w-auto">
              <span className="h-2 border border-accent-primary bg-accent-quartenary p-1.5 absolute -ml-2"></span>
              <div className="pl-3">
                <h4>Arc two</h4>
                <p>{character.arc?.wound || "Unknown"}</p>
              </div>
            </div>
            <div className="relative gap-2 w-auto">
              <span className="h-2 border border-accent-primary bg-accent-quartenary p-1.5 absolute -ml-2"></span>
              <div className="pl-3">
                <h4>Arc three</h4>
                <p>{character.arc?.wound || "Unknown"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom text-xs">
        <button
          onClick={() =>
            navigate(`/world/${character.worldId}/characters/${character.id}`)
          }
        >
          Edit
        </button>
        <button onClick={() => setShowDeleteConfirm(true)}>Delete</button>
        <button
          onClick={() =>
            navigate(
              `/world/${character.worldId}/characters/view/${character.id}`,
            )
          }
        >
          View
        </button>
      </div>

      {showDeleteConfirm && (
        <DeleteDialog
          entity={character.name}
          setShowDeleteConfirm={setShowDeleteConfirm}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
}
