import ls from '../ls';

const lists = [
  {
    name: 'weq', items: [], inTrash: true, inTrashFrom: 1564038164836,
  },
  {
    name: 'asd', items: [], inTrash: true, inTrashFrom: 1564037221755,
  },
  {
    name: 'zxc', items: [], inTrash: true, inTrashFrom: 1564037221273,
  },
  {
    name: '12321312', items: [], inTrash: true, inTrashFrom: 1564037219043,
  },
];

test('saveLists', () => {
  ls.saveLists(lists);
  const listsFromLocalStorage = JSON.parse(localStorage.lists);
  expect(listsFromLocalStorage).toStrictEqual(lists);
});

test('getLists', () => {
  const listsGromGetLists = ls.getLists(lists);
  expect(listsGromGetLists).toStrictEqual(lists);
});
