import { useEffect, useState, type FormEvent } from "react";
import { createEvent, getEntitiesByType } from "../db/entities";
import type { WorldEvent, Character, Location } from "../types/entities";
import { useTheme } from "../theme/theme";
import { useWorldStore } from "../store/worldStore";
import WorldNav from "../components/WorldNav";
import { EmptyBox } from "../components/EmptyBox";

export function TimelinePage() {
  const { theme } = useTheme();
  const currentWorldId = useWorldStore((s) => s.currentWorldId);
  const [events, setEvents] = useState<WorldEvent[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sortKey, setSortKey] = useState(0);
  const [displayDate, setDisplayDate] = useState("");
  const [locationId, setLocationId] = useState("");
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  const [filterCharacterId, setFilterCharacterId] = useState("");
  const [filterLocationId, setFilterLocationId] = useState("");

  useEffect(() => {
    if (currentWorldId) {
      refresh(currentWorldId);
    }
  }, [currentWorldId]);

  async function refresh(worldId: string) {
    setEvents(await getEntitiesByType<WorldEvent>(worldId, "event"));
    setCharacters(await getEntitiesByType<Character>(worldId, "character"));
    setLocations(await getEntitiesByType<Location>(worldId, "location"));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!currentWorldId) return;
    await createEvent(currentWorldId, {
      name,
      description,
      tags: [],
      date: { sortKey, display: displayDate || String(sortKey) },
      locationId: locationId || undefined,
      participantIds,
    });
    setName("");
    setDescription("");
    setSortKey(0);
    setDisplayDate("");
    setLocationId("");
    setParticipantIds([]);
    setShowForm(false);
    await refresh(currentWorldId);
  }

  function toggleParticipant(id: string) {
    setParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }

  function nameIn(
    id: string | undefined,
    list: { id: string; name: string }[],
  ) {
    return list.find((x) => x.id === id)?.name;
  }

  const filteredEvents = events
    .filter(
      (ev) =>
        !filterCharacterId || ev.participantIds.includes(filterCharacterId),
    )
    .filter((ev) => !filterLocationId || ev.locationId === filterLocationId)
    .sort((a, b) => a.date.sortKey - b.date.sortKey);

  const currentWorld = useWorldStore(
    (s) => s.worlds.find((w) => w.id === currentWorldId) ?? null,
  );

  const inputClasses =
    "rounded-md border border-border bg-bg-surface px-2 py-1.5 text-text-primary";

  return (
    <div className="">
      <WorldNav
        title={theme.vocabulary.entityLabelsPlural.event}
        world={currentWorld?.name}
      >
        <button
          onClick={() => setShowForm((s) => !s)}
          className={`rounded-lg text-xs border border-border bg-bg-surface px-3 py-1.5 text-text-primary ${theme.id === "literary-historical" ? "text-white" : ""} `}
        >
          + Add Event
        </button>
      </WorldNav>

      <div className="p-4">
        <div className="mt-2 flex flex-wrap gap-2 justify-self-end">
          <select
            value={filterCharacterId}
            onChange={(e) => setFilterCharacterId(e.target.value)}
            className={inputClasses}
          >
            <option value="">All characters</option>
            {characters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={filterLocationId}
            onChange={(e) => setFilterLocationId(e.target.value)}
            className={inputClasses}
          >
            <option value="">All locations</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-3 rounded-lg border border-border bg-bg-card p-4"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Event name"
              required
              className={inputClasses}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What happened"
              rows={3}
              className={inputClasses}
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={sortKey}
                onChange={(e) => setSortKey(Number(e.target.value))}
                placeholder="Sort order (number)"
                className={inputClasses}
              />
              <input
                value={displayDate}
                onChange={(e) => setDisplayDate(e.target.value)}
                placeholder="Display date, e.g. Year 1421"
                className={inputClasses}
              />
            </div>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className={inputClasses}
            >
              <option value="">No location</option>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap gap-3">
              {characters.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-1 text-sm text-text-secondary"
                >
                  <input
                    type="checkbox"
                    checked={participantIds.includes(c.id)}
                    onChange={() => toggleParticipant(c.id)}
                  />
                  {c.name}
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="self-start rounded-md bg-accent-primary px-3 py-1.5 text-bg-base"
            >
              Save
            </button>
          </form>
        )}

        {filteredEvents.length < 1 ? (
          <EmptyBox
            title={theme.vocabulary.emptyTitle.event}
            subtitle={theme.vocabulary.emptySubtitle.event}
          />
        ) : (
          <div className="mt-6 flex flex-col gap-4 border-l-2 border-border pl-5">
            {filteredEvents.map((ev) => (
              <div key={ev.id} className="relative">
                <div className="absolute -left-5.5 top-1.5 h-2 w-2 rounded-full bg-accent-primary" />
                <p className="text-sm text-text-secondary">{ev.date.display}</p>
                <strong className="text-text-primary">{ev.name}</strong>
                {ev.locationId && (
                  <p className="text-sm text-text-secondary">
                    at {nameIn(ev.locationId, locations)}
                  </p>
                )}
                {ev.participantIds.length > 0 && (
                  <p className="text-sm text-text-secondary">
                    with{" "}
                    {ev.participantIds
                      .map((id) => nameIn(id, characters))
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
