import { type CTag, type IConsumable, allTags, grab, withLifecycle } from '../../dist/cardboard.js';
import { type TodoItem } from './state.js';

const { div, button, input, h4 } = allTags;

export default function TodoItem(
  content: IConsumable<TodoItem>,
  remove: (self: CTag, content: IConsumable<TodoItem>) => void
) {
  let isComplete = grab(content, 'complete', false);
  let todoItem = grab(content, 'item', 'Empty TODO');

  return withLifecycle(
    div(
      input()
        .setAttrs({ type: 'checkbox', name: 'todo-complete' })
        .on('change', (self, evt) => {
          content.value.complete = self.checked;
        }),
      h4(todoItem)
        .stylesIf(isComplete, { textDecoration: 'line-through' }),
      button('-').addClass('btn-remove')
        .clicked((self) => {
          if (remove) remove(self, content);
        }), // self.parent will be div
    ).addClass('todo-item'),
    {
      removed(tag) {
        // isComplete.
        // console.log('aaaa');
        // isComplete.destroy();
        // todoItem.destroy();
      },
    }
  );
}
