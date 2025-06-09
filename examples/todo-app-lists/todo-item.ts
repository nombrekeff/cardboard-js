import { type CTag, type State, allTags } from '../../dist/cardboard.js';
import { type TodoItem } from './state.js';

const { div, button, input, h4 } = allTags;

export default function TodoItem(
  content: State<TodoItem>,
  remove: (self: CTag, content: State<TodoItem>) => void
) {
  return div(
    input()
      .setAttrs({ type: 'checkbox', name: 'todo-complete' })
      .on('change', (self, evt) => {
        content.value.complete = self.checked;
      }),
    h4(content.value.item)
      .stylesIf(content.grab('complete', false), { textDecoration: 'line-through' }),
    button('-').addClass('btn-remove')
      .clicked((self) => {
        if (remove) remove(self, content);
      }),
  ).addClass('todo-item');
}
