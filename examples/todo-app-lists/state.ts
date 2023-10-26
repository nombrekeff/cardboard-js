import { type IConsumable, listState, state } from '../../dist/cardboard.js';
export interface TodoItem {
  item: string;
  complete: boolean;
}

const appState = listState<TodoItem>(
  new Array(500).fill('')
    .map((_, index) => ({ item: `Item ${index}`, complete: false }))
    .sort(() => Math.random() > .5 ? 1 : -1)
);
export const newTodo = state('');
export const todos = appState.list;
export const todoCount = appState.length;
export const addTodo = (item: string, complete = false) => {
  appState.addAt({ item, complete: complete }, 0);
};
export const addTodoAt = (item: string, index: number, complete = false) => {
  appState.addAt({ item, complete: complete }, index);
};
export const removeTodo = appState.remove;