import { CTag, allTags } from '../../dist/cardboard.js';
const { div, button } = allTags;

export default function todoItem(content: string, opts: { remove: (self: CTag, content: string) => void }) {
  const removeItem = (self) => {
    if (opts.remove) {
      opts.remove(self, content);
    }
    self.remove();
  };

  return div
    .silent(
      content,
      button('-')
        .addClass('btn-remove')
        .clicked((self) => removeItem(self.parent)), // self.parent will be div
    )
    .addClass('todo-item');
}
