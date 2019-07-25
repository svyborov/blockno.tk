<div class="card">
  <div class="card-header">
    {#if titleEditing}
      <input type="text" class="form-control border-0 m-0" aria-label="Text input with checkbox" bind:value={titleInputValue} on:keydown={(e) => e.which === 13 ? updateTitle() : null}>
    {:else}
      {name}
      <button type="button" class="btn btn-primary" on:click={toggleTitleEditing}>Edit</button>
    {/if}
    <button type="button" class="btn btn-danger" on:click={moveListToTrash}>Delete</button>
  </div>
  <div class="card-body p-0">
    <form on:submit|preventDefault={addItem}>
      <input type="text" class="form-control border-0 m-0" aria-label="Text input with checkbox" bind:value={inputValue}>
    </form>
  </div>
  <ul class="list-group list-group-flush">
    {#each items as item, i}
      <li class="list-group-item p-0 rounded-0">
        <div class="input-group m-0">
          <div class="input-group-prepend">
            <div class="input-group-text border-0">
              <input type="checkbox" aria-label="Checkbox for following text input">
            </div>
          </div>
          <input type="text" class="form-control border-0 m-0" aria-label="Text input with checkbox" bind:value={item} on:keydown={() => editItem(i, item)}>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary border-0" type="button" id="button-addon2" on:click={() => removeItem(i)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </li>
    {/each}
  </ul>
 </div>

  <script>
  import { remove } from '../utils';

    let inputValue = '';

    const addItem = () => {
      updateList(id, { items: [...items, inputValue] });
      inputValue = '';
    };

    const removeItem = (i) => {
      const newItems = remove(items, i);
      updateList(id, { items: newItems });
    };

    const editItem = (i, item) => {
      items[i] = item;
      updateList(id, { items });
    };

    const updateTitle = () => {
      toggleTitleEditing();
        updateList(id, { name: titleInputValue });
    };

    const moveListToTrash = () => {
      updateList(id, { inTrash: true, inTrashFrom: Date.now() });
    };

    const toggleTitleEditing = () => {
      titleEditing = !titleEditing
    };

    export let name = '';
    export let titleInputValue = name;
    export let items = [];
    export let id = 0;
    export let updateList;
    export let titleEditing = false;
  </script>

  <style>
  </style>
