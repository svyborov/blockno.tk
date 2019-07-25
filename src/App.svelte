<script>
  import { onMount, onDestroy } from 'svelte';
  import Welcome from './components/Welcome';
  import { get } from 'svelte/store'
  import ListsView from './components/ListsView';
  import { createLists, createViewerState } from './storages';
  import ls from './ls';
  import { removeAllOutdatedInTrash } from './utils';

  const lists = createLists();
  const viewerState = createViewerState();

  let trashView = false;
  let listsToView = [];
  let allLists = [];
  let removeInterval;

  const unsubscr2 = viewerState.subscribe(({ trash }) => {
    trashView = trash;
  });

  const unsubscr = lists.subscribe(value => {
    allLists = value;
  });

  $: listsToView = allLists.reduce((acc, element, id) => ([...acc, {id, ...element}]), []).filter(l => l.inTrash === trashView);

  onMount(() => {
    removeInterval = setInterval(removeAllOutdatedInTrash, 60 * 60 * 1000);
    const l = ls.getLists();
    if (l) {
      lists.setLists(l);
    }
  });

  onDestroy(() => {
    unsubscr();
    unsubscr2();
    clearInterval(removeInterval);
  });

  let welcProps = {
    lists,
    viewerState
  }
</script>

<Welcome { ...welcProps } ></Welcome>
<ListsView lists={lists} items={listsToView}></ListsView>

