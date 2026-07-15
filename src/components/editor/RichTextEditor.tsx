import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { WikiLink } from './WikiLinkExtension';
import { useTheme } from '../../theme/theme';

export function RichTextEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const { theme } = useTheme();
  const editor = useEditor({
    extensions: [StarterKit, WikiLink],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const btn = (active: boolean) => `rounded px-2 py-0.5 text-sm ${active ? 'bg-bg-card text-text-primary' : 'text-text-secondary'}`;

  return (
    <div className={`rounded-md border border-border ${theme.id === 'literary-historical' ? 'bg-bg-surface-alt' : 'bg-bg-surface'}`}>
      <div className="flex gap-1 border-b border-border p-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`${btn(editor.isActive('italic'))} italic`}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))}>• List</button>
      </div>
      <EditorContent editor={editor} className="px-2 py-1.5 text-text-primary [&_.ProseMirror]:min-h-25 [&_.ProseMirror]:outline-none" />
    </div>
  );
}