export function Fieldtwo({ label, value, onChange, placeholder }: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const className = 'rounded-sm focus:outline-0 text-text-primary text-sm italic';
  return (
    <label className="flex flex-col gap-1 rounded-sm border border-border focus:outline-1 focus:outline-accent-primary bg-bg-surface px-3 py-2.5">
      <span className="text-[10px] uppercase tracking-widest text-text-secondary">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={className} />
    </label>
  );
}