import ls from './ls';

export const remove = (array, index) => array.filter((_el, i) => i !== index);

export const removeAllOutdatedInTrash = () => {
  const sevenDaysDelay = 7 * 24 * 60 * 60 * 1000;
  const lists = ls.getLists();
  lists.forEach((list, index) => {
    if (list.inTrash && ((Date.now() - list.inTrashFrom) > sevenDaysDelay)) {
      remove(lists, index);
    }
  });
  ls.saveLists(lists);
};
