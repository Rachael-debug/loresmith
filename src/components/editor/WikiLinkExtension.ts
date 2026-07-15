import { Node, mergeAttributes, InputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { WikiLinkView } from './WikiLinkView';

export const WikiLink = Node.create({
  name: 'wikiLink',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return { label: { default: '' } };
  },

  parseHTML() {
    return [{ tag: 'span[data-wiki-link]' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { 'data-wiki-link': '' }), `[[${node.attrs.label}]]`];
  },

  addNodeView() {
    return ReactNodeViewRenderer(WikiLinkView);
  },

  addInputRules() {
    return [
      new InputRule({
        find: /\[\[([^[\]]+)\]\]$/,
        handler: ({ state, range, match }) => {
          const label = match[1];
          state.tr.replaceWith(range.from, range.to, this.type.create({ label }));
        },
      }),
    ];
  },
});