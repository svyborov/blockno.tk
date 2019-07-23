<script>
  import { onMount } from 'svelte';
  import { writable, get } from 'svelte/store';
  import TodoList from './TodoList.svelte';
  import Trash from './Trash.svelte';
  import { remove } from './utils';

  let trash = false;
  const removeAllOutdatedInTrash = () => {
    const sevenDaysDelay = 7 * 24 * 60 * 60 * 1000;
    const lists = ls.getLists();
    lists.forEach((list, index) => {
      if (list.inTrash && ((Date.now() - list.inTrashFrom) > sevenDaysDelay)) {
        remove(lists, index);
      }
    });
    ls.saveLists(lists);
  };
  const ls = {
    saveLists: lists => localStorage.setItem('lists', JSON.stringify(lists)),
    getLists: () => {
      const lists = localStorage.getItem('lists');
      if (lists) {
        return JSON.parse(lists)
      }
    },
    removeList: (listId) => {
        const lists = ls.getLists();
        remove(lists, listId);
        ls.saveLists(lists);
    },
  };

  const createLists = () => {
    const { subscribe, update, set } = writable([]);
    setInterval(removeAllOutdatedInTrash, 60 * 60 * 1000);
    return {
      subscribe,
      addList: list => {
        update(lists => [...lists, list]);
        ls.saveLists(get(lists))
      },
      updateList: (i, list) => {
        console.log(lists);
        update(lists => {
          lists[i] = {...lists[i], ...list};
          console.log(lists);
          return lists
        });
        ls.saveLists(get(lists))
      },
      setLists: lists => set(lists),
      removeList: (listId) => {
        ls.removeList(listId);
      }
    };
  };

  const lists = createLists();

  let inputVal = '';
  const createList = () => {
    lists.addList({ name: inputVal, items: [], inTrash: false, inTrashFrom: null });
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
  <button type="button" class="btn btn-danger" on:click={() => trash = !trash}>В корзину</button>
</div>

<div class="card-columns">
    {#each $lists as list, i}
      {#if !trash && !list.inTrash}
        <TodoList {...list} listId={i} updateList={lists.updateList}></TodoList>
      {:else if trash && list.inTrash}
        <Trash {...list} listId={i} updateList={lists.updateList}></Trash>
      {/if}
    {/each}
</div>

<style lang="text/sass">
  @import "~bootstrap/scss/bootstrap";

  .card-columns {
    @include media-breakpoint-only(lg) {
      column-count: 4;
    }
    @include media-breakpoint-only(xl) {
      column-count: 5;
    }
  }
</style>
