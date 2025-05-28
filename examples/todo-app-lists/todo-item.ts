import { type CTag, type IObservable, allTags, grab, withLifecycle } from '../../dist/cardboard.js';
import { type TodoItem } from './state.js';

const { div, button, input, h4 } = allTags;

export default function TodoItem(
  content: IObservable<TodoItem>,
  remove: (self: CTag, content: IObservable<TodoItem>) => void
) {
  // let isComplete = grab(content, 'complete', false);
  // let todoItem = grab(content, 'item', 'Empty TODO');

  return withLifecycle(
    div(
      input()
        .setAttrs({ type: 'checkbox', name: 'todo-complete' })
        .on('change', (self, evt) => {
          content.value.complete = self.checked;
        }),
      h4(content.value.item)
        // .consume(content, (tag, con) => {
        //   tag.setStyle({ textDecoration: con.complete ? 'line-through' : '' });
        // }),
        .stylesIf(grab(content, 'complete', false), { textDecoration: 'line-through' }),
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
        // isComplete = null;
        // todoItem.destroy();
        // content.destroy();
        // content = null;
      },
    }
  );
}
