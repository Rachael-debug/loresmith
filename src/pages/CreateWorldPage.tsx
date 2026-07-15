import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconArrowLeft, IconArrowRight, IconCheck, IconX,
  IconSword, IconPencil,
} from '@tabler/icons-react';
import { useWorldStore } from '../store/worldStore';
import { themes } from '../theme/theme';
import { GENRE_PRESETS } from '../data/genres';
import type { ThemeId } from '../types/entities';

const TOTAL_STEPS = 4;

const THEME_META: Record<ThemeId, { bar: string; desc: string; swatch: string }> = {
  'dark-fantasy': {
    bar: '#b85c1a',
    desc: 'Obsidian stone, ember glow, aged parchment accents',
    swatch: '#0e0c0a',
  },
  romance: {
    bar: '#b85470',
    desc: 'Warm cream, blush rose, soft candlelit surfaces',
    swatch: '#fdf6ee',
  },
  'literary-historical': {
    bar: '#8c6d2a',
    desc: 'Aged paper, library green, brass and ink tones',
    swatch: '#f4f0e8',
  },
};

export function CreateWorldPage() {
  const navigate = useNavigate();
  const { createWorld } = useWorldStore();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [genre, setGenre] = useState('');
  const [customGenre, setCustomGenre] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [themeId, setThemeId] = useState<ThemeId>('dark-fantasy');
  const [privacy, setPrivacy] = useState<'private' | 'shareable'>('private');

  const resolvedGenre = showCustom ? customGenre : genre;
  const themeIds = Object.keys(themes) as ThemeId[];

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !resolvedGenre) return;
    const world = await createWorld(name.trim(), themeId, resolvedGenre, tagline.trim());
    navigate(`/world/${world.id}/all`);
  }

  // ── Step labels ────────────────────────────────────────────────
  const STEP_LABELS = ['Name', 'Genre', 'Theme', 'Review'];

  function StepBar() {
    return (
      <div className="home flex items-center justify-center gap-0 border-b border-white/6 px-7 py-4">
        {STEP_LABELS.map((label, i) => {
          const s = i + 1;
          const done = s < step;
          const active = s === step;
          return (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-widest ${active ? 'text-white/85' : done ? 'text-white/35' : 'text-white/20'}`}>
                <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium ${active ? 'border-white/90 bg-white/90 text-black' : done ? 'border-white/20 bg-white/12 text-white/60' : 'border-white/12 text-white/20'}`}>
                  {done ? <IconCheck size={10} /> : s}
                </div>
                {label}
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className={`h-px w-8 ${s < step ? 'bg-white/20' : 'bg-white/08'}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  function Footer({ onBack, onNext, nextLabel, nextDisabled = false, isSubmit = false }: {
    onBack?: () => void;
    onNext?: () => void;
    nextLabel: string;
    nextDisabled?: boolean;
    isSubmit?: boolean;
  }) {
    return (
      <div className="home mt-4 flex w-full max-w-145 items-center justify-between border-t border-white/6 pt-4">
        {onBack ? (
          <button type="button" onClick={onBack} className="flex items-center gap-1.5 border-none bg-transparent text-[11px] uppercase tracking-widest text-white/30 hover:text-white/60">
            <IconArrowLeft size={14} /> Back
          </button>
        ) : <span />}
        <button
          type={isSubmit ? 'submit' : 'button'}
          onClick={isSubmit ? undefined : onNext}
          disabled={nextDisabled}
          className={`flex items-center gap-2 border px-5 py-2.5 text-[11px] uppercase tracking-widest disabled:opacity-30 ${isSubmit ? 'border-transparent bg-white/90 text-black hover:bg-white' : 'border-white/25 bg-white/06 text-white/80 hover:border-white/40 hover:bg-white/12'}`}
        >
          {nextLabel} <IconArrowRight size={14} />
        </button>
      </div>
    );
  }

  // ── Step 1 — Name ───────────────────────────────────────────────
  function step1() {
    return (
      <div className="home flex w-full max-w-145 flex-col gap-6">
        <div className="text-center">
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-white/25">Step 1 of {TOTAL_STEPS}</p>
          <h2 className="mb-1.5 font-shell-display text-[22px] tracking-[0.06em] text-white/88">Name your world</h2>
          <p className="font-shell-subbody text-[13px] italic leading-relaxed text-white/38">Every great story begins with a name. What will your world be called?</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-[0.14em] text-white/30">World name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. The Ashen Dominion, Halverton, 1889 London…"
            className="border border-white/10 bg-white/4 px-3.5 py-2.5 text-sm font-light text-white/82 placeholder-white/18 outline-none focus:border-white/30" />
          <p className="font-shell-subbody text-[11px] italic text-white/20">You can always rename your world later from world settings.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-[0.14em] text-white/30">One-line tagline <span className="text-[10px] text-white/18">(optional)</span></label>
          <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="A brief description shown on your world library card…"
            className="border border-white/10 bg-white/4 px-3.5 py-2.5 text-sm font-light text-white/82 placeholder-white/18 outline-none focus:border-white/30" />
        </div>
        <Footer onNext={() => setStep(2)} nextLabel="Next — Pick a genre" nextDisabled={!name.trim()} />
      </div>
    );
  }

  // ── Step 2 — Genre ──────────────────────────────────────────────
  function step2() {
    return (
      <div className="home flex w-full max-w-145 flex-col gap-6">
        <div className="text-center">
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-white/25">Step 2 of {TOTAL_STEPS}</p>
          <h2 className="mb-1.5 font-shell-display text-[22px] tracking-[0.06em] text-white/88">What are you writing?</h2>
          <p className="font-shell-subbody text-[13px] italic leading-relaxed text-white/38">Pick a genre or type your own. This is just a label — it doesn't change how the tool works, only how you orient yourself.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {GENRE_PRESETS.map((g) => (
            <button key={g} type="button" onClick={() => { setGenre(g); setShowCustom(false); }}
              className={`border px-2.5 py-1 text-[11px] tracking-wide transition-colors ${!showCustom && genre === g ? 'border-shell-accent bg-shell-accent/20 text-white/88' : 'border-white/10 text-white/35 hover:border-white/25 hover:text-white/60'}`}>
              {g}
            </button>
          ))}
          <button type="button" onClick={() => { setShowCustom(true); setGenre(''); }}
            className={`flex items-center gap-1 border px-2.5 py-1 text-[11px] tracking-wide transition-colors ${showCustom ? 'border-white/60 text-white/88' : 'border-dashed border-white/15 text-white/30 hover:border-white/30 hover:text-white/55'}`}>
            <IconPencil size={11} /> Custom
          </button>
        </div>

        {showCustom && (
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.14em] text-white/30">Your genre</label>
            <input value={customGenre} onChange={(e) => setCustomGenre(e.target.value)} autoFocus
              placeholder="e.g. Cozy Witch Mystery, Afrofuturism, Weird West…"
              className="border border-white/10 bg-white/4 px-3.5 py-2.5 text-sm font-light text-white/82 placeholder-white/18 outline-none focus:border-white/30" />
          </div>
        )}

        <Footer onBack={() => setStep(1)} onNext={() => setStep(3)} nextLabel="Next — Choose a theme" nextDisabled={!resolvedGenre.trim()} />
      </div>
    );
  }

  // ── Step 3 — Theme ─────────────────────────────────────────────
  function step3() {
    return (
      <div className="home flex w-full max-w-145 flex-col gap-6">
        <div className="text-center">
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-white/25">Step 3 of {TOTAL_STEPS}</p>
          <h2 className="mb-1.5 font-shell-display text-[22px] tracking-[0.06em] text-white/88">Choose a theme</h2>
          <p className="font-shell-subbody text-[13px] italic leading-relaxed text-white/38">Your theme is the visual skin — colours, typography, atmosphere. It can be changed independently of your genre at any time.</p>
        </div>

        <div className="flex flex-col gap-2">
          {themeIds.map((id) => {
            const meta = THEME_META[id];
            const t = themes[id];
            const active = themeId === id;
            return (
              <div key={id} onClick={() => setThemeId(id)} className={`cursor-pointer border transition-colors ${active ? 'border-white/40' : 'border-white/08 hover:border-white/20'}`}>
                <div className="h-1" style={{ background: meta.bar }} />
                <div className="flex items-center gap-3 p-3.5">
                  <div className="h-9 w-9 shrink-0 border border-white/06" style={{ background: meta.swatch }} />
                  <div className="flex-1">
                    <p className="font-shell-display text-[12px] tracking-[0.06em] text-white/65">{t.name}</p>
                    <p className="font-shell-subbody text-[11px] italic text-white/25">{meta.desc}</p>
                  </div>
                  <div className="ml-auto text-[13px] text-white/30" style={{ fontFamily: t.fonts.display }}>Aa</div>
                </div>
              </div>
            );
          })}
        </div>

        <Footer onBack={() => setStep(2)} onNext={() => setStep(4)} nextLabel="Next — Review" />
      </div>
    );
  }

  // ── Step 4 — Review ─────────────────────────────────────────────
  function step4() {
    const t = themes[themeId];
    const meta = THEME_META[themeId];
    return (
      <form onSubmit={handleCreate} className="homeflex w-full max-w-145 flex-col gap-6">
        <div className="text-center">
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-white/25">Step 4 of {TOTAL_STEPS}</p>
          <h2 className="mb-1.5 font-shell-display text-[22px] tracking-[0.06em] text-white/88">Review & begin</h2>
          <p className="font-shell-subbody text-[13px] italic leading-relaxed text-white/38">Everything looks right? You can edit any of these from your world settings once you're inside.</p>
        </div>

        <div className="overflow-hidden border border-white/10" style={{ background: '#161412' }}>
          <div className="flex items-center justify-between border-b border-white/6 p-4">
            <p className="font-shell-display text-base tracking-wider text-white/88">{name || 'Untitled World'}</p>
            <span className="border px-2.5 py-0.5 text-[9px] uppercase tracking-widest" style={{ borderColor: `${meta.bar}66`, color: meta.bar }}>
              {resolvedGenre}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 p-4">
            <div>
              <p className="mb-0.5 text-[9px] uppercase tracking-widest text-white/22">Genre</p>
              <p className="text-[12px] font-light text-white/55">{resolvedGenre}</p>
            </div>
            <div>
              <p className="mb-0.5 text-[9px] uppercase tracking-widest text-white/22">Theme</p>
              <p className="text-[12px] font-light text-white/55">{t.name}</p>
              <div className="mt-0.5 h-0.5" style={{ background: meta.bar }} />
            </div>
            <div>
              <p className="mb-0.5 text-[9px] uppercase tracking-widest text-white/22">Privacy</p>
              <p className="text-[12px] font-light text-white/55 capitalize">{privacy}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-[0.14em] text-white/30">Privacy</label>
          <div className="flex gap-2.5">
            {(['private', 'shareable'] as const).map((p) => (
              <div key={p} onClick={() => setPrivacy(p)}
                className={`flex flex-1 cursor-pointer items-start gap-2.5 border p-3.5 transition-colors ${privacy === p ? 'border-white/40' : 'border-white/08 hover:border-white/18'}`}
                style={{ background: '#161412' }}>
                <div className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${privacy === p ? 'border-white/70' : 'border-white/20'}`}>
                  {privacy === p && <div className="h-1.5 w-1.5 rounded-full bg-white/80" />}
                </div>
                <div>
                  <p className="text-[12px] text-white/60">{p === 'private' ? 'Private' : 'Shareable link'}</p>
                  <p className="font-shell-subbody text-[11px] italic text-white/22">{p === 'private' ? 'Only you can see this world' : 'Anyone with the link can view'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer onBack={() => setStep(3)} nextLabel="Begin writing" isSubmit />
      </form>
    );
  }

  return (
    <div className="homeflex min-h-screen flex-col" style={{ background: '#111', fontFamily: "'Jost', sans-serif" }}>
      {/* Header */}
      <div className="flex h-13 shrink-0 items-center justify-between border-b border-white/[0.07] px-7" style={{ background: '#0d0d0d' }}>
        <div onClick={() => navigate('/')} className="flex items-center gap-2.5 cursor-pointer">
          <div className="flex h-6.5 w-6.5 items-center justify-center border border-white/10 text-white/50">
            <IconSword size={13} />
          </div>
          <span className="font-shell-display text-sm tracking-[0.12em] text-white/70">Loresmith</span>
        </div>
        <button type="button" onClick={() => navigate('/')} className="flex items-center gap-1.5 border-none bg-transparent text-[11px] uppercase tracking-widest text-white/30 hover:text-white/60">
          <IconX size={15} /> Cancel
        </button>
      </div>

      <StepBar />

      <div className="home flex flex-1 flex-col items-center overflow-y-auto px-7 py-8">
        {step === 1 && step1()}
        {step === 2 && step2()}
        {step === 3 && step3()}
        {step === 4 && step4()}
      </div>
    </div>
  );
}