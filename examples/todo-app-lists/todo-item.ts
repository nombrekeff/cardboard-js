import { CTag, type IConsumable, allTags, text } from '../../dist/cardboard.js';
import { TodoItem } from './state.js';

const { div, button, input, h4 } = allTags;

export default function TodoItem(content: IConsumable<TodoItem>, opts: { remove: (self: typeof CTag, content: IConsumable<TodoItem>) => void }) {
  const removeItem = (self) => {
    if (opts.remove) {
      opts.remove(self, content);
    }
  };
  const isComplete = content.intersect((c) => c.complete);

  return div(
    input().setAttrs({ type: 'checkbox' }).on('change', (self, evt) => {
      content.value.complete = self.checked;
    }),
    h4(text('$item', content))
      .stylesIf(isComplete, { textDecoration: 'line-through' }),
    button('-')
      .addClass('btn-remove')
      .clicked((self) => removeItem(self.parent)), // self.parent will be div
  ).addClass('todo-item');
}
