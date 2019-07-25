export default {
  saveLists: lists => localStorage.setItem('lists', JSON.stringify(lists)),
  getLists: () => {
    const lists = localStorage.getItem('lists');
    return lists ? JSON.parse(lists) : [];
  },
};
