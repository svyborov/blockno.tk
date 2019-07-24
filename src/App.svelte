<script>
  import { onMount, onDestroy } from 'svelte';
  import Welcome from './components/Welcome';
  import { get } from 'svelte/store'
  import ListsView from './components/ListsView';
  import { createLists, createViewerState } from './storages';
  import ls from './ls';
  
  const lists = createLists();
  const viewerState = createViewerState();
  
  let trashView = false;
  let listsToView = [];

  const unsubscr2 = viewerState.subscribe(({ trash }) => {
    trashView = trash
  });

  const unsubscr = lists.subscribe(value => {
    listsToView = value.filter(l => l.inTrash === trashView)
  });

  onMount(() => {
    const l = ls.getLists();
    if (l) {
      lists.setLists(l);
    }
  });

  onDestroy(unsubscr);

  let welcProps = {
    lists,
    viewerState
  }
</script>

<Welcome { ...welcProps } ></Welcome>
<ListsView lists={lists} items={listsToView}></ListsView>

