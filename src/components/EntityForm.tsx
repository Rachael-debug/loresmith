import { useState, type FormEvent, type ReactNode } from 'react';
import { RichTextEditor } from './editor/RichTextEditor';

interface EntityFormProps {
  title: string;
  onSubmit: (data: { name: string; description: string; tags: string[] }) => void;
  onCancel: () => void;
  children?: ReactNode;
}

export function EntityForm({ title, onSubmit, onCancel, children }: EntityFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    onSubmit({ name, description, tags });
  }

  const inputClasses = 'rounded-md border border-border bg-bg-surface px-2 py-1.5 text-text-primary';

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-3 rounded-lg border border-border bg-bg-card p-4">
      <h2 className="font-display text-lg">{title}</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required className={inputClasses} />
      <RichTextEditor content={description} onChange={setDescription} />
      <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Tags, comma separated" className={inputClasses} />
      {children}
      <div className="flex gap-2">
        <button type="submit" className="rounded-md bg-accent-primary px-3 py-1.5 text-bg-base">Save</button>
        <button type="button" onClick={onCancel} className="rounded-md border border-border px-3 py-1.5 text-text-primary">Cancel</button>
      </div>
    </form>
  );
}