import { writable } from 'svelte/store';
import { remove } from '../utils';
import ls from '../ls';

export default () => {
  const { subscribe, update, set } = writable([]);
  return {
    subscribe,
    addList: (list) => {
      update((lists) => {
        const newLists = [...lists, list];
        ls.saveLists(newLists);
        return newLists;
      });
    },
    updateList: (listId, list) => {
      update((lists) => {
        const newLists = lists.map((el, i) => (listId === i ? { ...el, ...list } : el));
        ls.saveLists(newLists);
        return newLists;
      });
    },
    setLists: lists => set(lists),
    removeList: (listId) => {
      update((lists) => {
        const newLists = remove(lists, listId);
        ls.saveLists(newLists);
        return newLists;
      });
    },
  };
};
