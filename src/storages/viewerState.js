import { writable } from 'svelte/store';

export default () => {
  const { subscribe, update } = writable({ trash: false });

  return {
    subscribe,
    toggleTrash: () => update(({ trash }) => ({ trash: !trash })),
  }
};
