import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { WikiLink } from './WikiLinkExtension';

export function RichTextView({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [StarterKit, WikiLink],
    content,
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;
    // setContent's second parameter expects an options object; omit to use defaults
    editor.commands.setContent(content);
  }, [content, editor]);

  if (!editor) return null;
  return <EditorContent editor={editor} className="text-sm text-text-secondary [&_.ProseMirror]:outline-none" />;
}