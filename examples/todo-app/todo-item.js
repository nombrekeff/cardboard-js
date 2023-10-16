import { allTags } from '../../dist/cardboard.js';
const { div, button } = allTags;
export default function TodoItem(content, opts) {
    const removeItem = (self) => {
        if (opts.remove) {
            opts.remove(self, content);
        }
        self.remove();
    };
    return div(content, button('-')
        .addClass('btn-remove')
        .clicked((self) => removeItem(self.parent))).addClass('todo-item');
}
//# sourceMappingURL=todo-item.js.map