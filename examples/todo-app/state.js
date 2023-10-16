import { fromJson, state, toJson } from '../../dist/cardboard.js';
export default state([...(toJson(localStorage.getItem('TODOS')) || [])], (newState) => {
    localStorage.setItem('TODOS', fromJson([...newState]));
});
//# sourceMappingURL=state.js.map