import createLists from '../storages/lists';

const defaultLists = [
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

let lists;

beforeEach(() => {
  lists = createLists();
});


test('setLists', () => {
  let valueFromLists;
  lists.setLists(defaultLists);
  lists.subscribe((value) => {
    valueFromLists = value;
  });
  expect(valueFromLists).toStrictEqual(defaultLists);
});

test('addList', () => {
  let valueFromLists;
  lists.setLists(defaultLists);
  const newList = {
    name: 'test', items: [], inTrash: false, inTrashFrom: null,
  };
  lists.addList(newList);
  lists.subscribe((value) => {
    valueFromLists = value;
  });
  const defaultValueWithNewList = [...defaultLists, newList];
  expect(valueFromLists).toStrictEqual(defaultValueWithNewList);
});

test('updateList', () => {
  let valueFromLists;
  lists.setLists(defaultLists);
  const newData = { name: 'test' };
  lists.updateList(0, newData);
  lists.subscribe((value) => {
    valueFromLists = value;
  });
  const defaultValueWithNewList = [...defaultLists];
  defaultValueWithNewList[0] = { ...defaultValueWithNewList[0], ...newData };
  expect(valueFromLists).toStrictEqual(defaultValueWithNewList);
});

test('removeList', () => {
  let valueFromLists;
  lists.setLists(defaultLists);
  lists.removeList(0);
  lists.subscribe((value) => {
    valueFromLists = value;
  });
  const defaultValueWithNewList = [...defaultLists];
  delete defaultValueWithNewList.splice(0, 1);
  expect(valueFromLists).toStrictEqual(defaultValueWithNewList);
});
