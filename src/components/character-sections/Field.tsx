import { RichTextEditor } from '../editor/RichTextEditor';

export function Field({ label, value, onChange, placeholder, multiline, richtext, hint }: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  richtext?: boolean;
  hint?: string;
}) {
  const className = 'rounded-sm border border-border focus:outline-1 focus:outline-accent-primary bg-bg-surface px-2 py-2 text-text-primary text-sm';
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-widest text-text-secondary">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={className} />
      ) : richtext ? (<RichTextEditor content={value} onChange={onChange} />) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={className} />
      )}
      <span className="italic text-[10px] text-text-secondary">{hint}</span>
    </label>
  );
}