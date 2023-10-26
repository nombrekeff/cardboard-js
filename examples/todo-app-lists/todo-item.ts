import { CTag, type IConsumable, allTags, text, grab } from '../../dist/cardboard.js';
import { type TodoItem } from './state.js';

const { div, button, input, h4 } = allTags;

export default function TodoItem(content: IConsumable<TodoItem>, opts: { remove: (self: typeof CTag, content: IConsumable<TodoItem>) => void }) {
  const removeItem = (self) => {
    if (opts.remove) {
      opts.remove(self, content);
    }
  };

  return div(
    input().setAttrs({ type: 'checkbox' }).on('change', (self, evt) => {
      content.value.complete = self.checked;
    }),
    h4(text('$item', content))
      .stylesIf(grab(content, 'complete', false), { textDecoration: 'line-through' }),
    button('-')
      .addClass('btn-remove')
      .clicked((self) => removeItem(self.parent)), // self.parent will be div
  ).addClass('todo-item');
}
