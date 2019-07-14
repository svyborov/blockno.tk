<script>
  import { onMount } from 'svelte';
  import { writable, get } from 'svelte/store';
  import TodoList from './TodoList.svelte';
	import { remove } from './utils';
  
  const ls = {
    saveLists: lists => localStorage.setItem('lists', JSON.stringify(lists)),
    getLists: () => {
      const lists = localStorage.getItem('lists');
      if (lists) {
        return JSON.parse(lists)
      }
    }
  };
    
  const createLists = () => {
    const { subscribe, update, set } = writable([]);
    
    return {
      subscribe,
      addList: list => {
        update(lists => [...lists, list]);
        ls.saveLists(get(lists))
      },
      updateList: (i, list) => { 
        update(lists => {
          lists[i] = {...lists[i], ...list};
          return lists
        });
        ls.saveLists(get(lists))
      },
      setLists: lists => set(lists)
    }
  };
  
  const lists = createLists();
  
  let inputVal = '';
  const createList = () => {
    lists.addList({ name: inputVal, items: [] });
    inputVal = '';
  };
  
  onMount(() => {
    const l = ls.getLists();
    if (l) {
      lists.setLists(l);
    }
  });
</script>

<div class="jumbotron text-center">
  <h1>Todo lists</h1>
  <div class="d-flex justify-content-center">
    <form on:submit|preventDefault={createList}>
      <input class="form-control form-control-lg" bind:value={inputVal} placeholder="list name">
    </form>
  </div>
</div>

<div class="card-columns">
  {#each $lists as list, i}
    <TodoList {...list} listId={i} updateList={lists.updateList}></TodoList>
  {/each}  
</div>

<style lang="text/sass">
	@import "~bootstrap/scss/bootstrap";
</style>
