import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorldStore } from '../store/worldStore';
import { getAllEntities, getEntitiesByType } from '../db/entities';
import { themes } from '../theme/theme';
import type { ThemeId, World } from '../types/entities';

export function HomePage() {
  const navigate = useNavigate();
  const { worlds, createWorld, setCurrentWorldId } = useWorldStore();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [places, setPlaces] = useState<Record<string, number>>({});
  const [characters, setCharacters] = useState<Record<string, number>>({});
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [newWorldTheme, setNewWorldTheme] = useState<ThemeId>('dark-fantasy');
  const themeIds = Object.keys(themes) as ThemeId[];

  useEffect(() => {
    Promise.all(worlds.map(async (w) => [w.id, (await getAllEntities(w.id)).length] as const)).then((pairs) => {
      setCounts(Object.fromEntries(pairs));
    });
    Promise.all(worlds.map(async (w) => [w.id, (await getEntitiesByType(w.id, 'location')).length] as const)).then((pairs) => {
      setPlaces(Object.fromEntries(pairs));
    });
    Promise.all(worlds.map(async (w) => [w.id, (await getEntitiesByType(w.id, 'character')).length] as const)).then((pairs) => {
      setCharacters(Object.fromEntries(pairs));
    });
  }, [worlds]);

  function enterWorld(world: World) {
    setCurrentWorldId(world.id);
    navigate(`/world/${world.id}/all`);
  }

//   async function handleCreate(e: FormEvent) {
//     e.preventDefault();
//     if (!name.trim()) return;
//     await createWorld(name.trim(), newWorldTheme);
//     setName('');
//     setShowForm(false);
//     navigate('/world/characters');
//   }

  return (
    <div className="home min-h-screen bg-shell-bg p-7 text-shell-text">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-shell-text-secondary font-shell-body">Welcome back</p>
          <h1 className="font-shell-display text-xl">Your world library</h1>
        </div>
        <button onClick={() => navigate('/create')} className=" border border-shell-border bg-white/5 hover:bg-white/10 px-4 py-2 text-xs text-shell-text font-shell-display">
          + Create new world
        </button>
      </div>

      {/* {showForm && (
        <form onSubmit={handleCreate} className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-shell-border bg-shell-surface p-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="World name" autoFocus className="rounded-md border border-shell-border bg-shell-card px-2 py-1.5 text-shell-text" />
          <div className="flex gap-1">
            {themeIds.map((id) => (
              <button key={id} type="button" onClick={() => setNewWorldTheme(id)}
                className={`rounded-md border px-2 py-1 text-xs ${newWorldTheme === id ? 'border-shell-accent text-shell-text' : 'border-shell-border text-shell-text-secondary'}`}>
                {themes[id].name}
              </button>
            ))}
          </div>
          <button type="submit" className="rounded-md bg-shell-accent px-3 py-1.5 text-shell-bg">Create</button>
        </form>
      )} */}

      <div className=" flex items-center gap-3 section-label mt-8 text-[10px] uppercase tracking-widest text-shell-text-secondary/60">Your worlds · {worlds.length} <hr /></div>
      <div className="mt-3 grid md:grid-cols-3 grid-cols-1 gap-3">
        {worlds.map((w) => {
          const worldTheme = themes[w.themeId];
          return (
            <div
              key={w.id}
              onClick={() => enterWorld(w)}
              className="cursor-pointer border border-shell-border h-48 relative pt-4 transition hover:border-white/20 bg-shell-surface flex flex-col justify-between"
            >
                <div className={`absolute inset-0 ${worldTheme.id === 'romance' ? 'bg-[radial-gradient(ellipse_at_70%_20%,_#3a1020_0%,_#200a14_60%,_transparent_100%)]' : worldTheme.id === 'dark-fantasy' ? 'bg-[radial-gradient(ellipse_at_30%_30%,_#3a1a0a_0%,_#1a0a0a_60%,_transparent_100%)]' : 'bg-[radial-gradient(ellipse_at_40%_40%,_#0a1a0a_0%,_#0a1408_60%,_transparent_100%)]'} opacity-15`}></div>
              <span
                className="inline-block border px-2 py-0.5 text-[10px] uppercase tracking-widest w-fit mx-4"
                style={{ borderColor: worldTheme.colors.accent.primary, color: worldTheme.colors.accent.primary }}
              >
                {worldTheme.name}
              </span>
              <div>
                <h2 className=" font-shell-display text-base text-shell-text mx-4">{w.name}</h2>
                <p className="text-sm text-shell-text-secondary font-shell-subbody italic mx-4 mb-4">{w.tagline}</p>
              <div className='py-4 px-4 border-t border-shell-border bg-black/25 flex gap-4'>
              <p className=" text-[10px] text-shell-text-secondary font-light">{counts[w.id] ?? 0} entries</p>
              <p className=" text-[10px] text-shell-text-secondary font-light">{places[w.id] ?? 0} places</p>
              <p className=" text-[10px] text-shell-text-secondary font-light">{characters[w.id] ?? 0} souls</p>
              </div>
              </div>
            </div>
          );
        })}

        <div onClick={() => navigate('/create')} className="flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-shell-border p-4 text-shell-text-secondary hover:border-shell-accent">
          <span>+</span>
          <span className="text-xs uppercase tracking-widest">Begin a new world</span>
        </div>
      </div>

      
      <div className="mt-8 flex flex-col gap-2 border border-shell-border bg-shell-surface p-4">
        <p className=" text-xs uppercase tracking-widest text-shell-text-secondary">Available themes</p>
        <hr className='text-shell-text-secondary/20' />
        {themeIds.map((id) => (
          <div key={id} className="flex items-center gap-3 border p-3 border-shell-border">
            <span style={{ background: themes[id].colors.accent.primary, border: `1px solid ${themes[id].colors.accent.secondary}` }} className="h-2.5 w-2.5 bg-opacity-10"  />
            <div>
              <p className="text-sm text-shell-text font-light">{themes[id].name}</p>
              <p className="text-xs text-shell-text-secondary text-opacity-80 font-shell-subbody italic">
                {id === 'dark-fantasy' && 'Obsidian, ember glow, Cinzel typeface'}
                {id === 'romance' && 'Blush, cream, Cormorant Garamond typeface'}
                {id === 'literary-historical' && 'Aged paper, brass, Playfair Display typeface'}
              </p>
            </div>
          </div>
        ))}
        <hr className='text-shell-text-secondary/20' />
        <p className="mt-2 text-xs italic text-shell-text-secondary font-shell-subbody">Each world carries its own theme, change it anytime from inside the world.</p>
      </div>
    </div>
  );
}