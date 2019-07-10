<li class='list'>
	<h4 class='list__name'>{name}</h4>
	<form on:submit|preventDefault={addItem}>
		<input type='text' class='list__item-input' placeholder="new item" bind:value={inputValue} >	
	</form>
	<ul class="list__item-list">
		{#each items as item, i}
			<li class='list__item'>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input type="checkbox" aria-label="Checkbox for following text input">
            </div>
          </div>
          <input type="text" class="form-control" aria-label="Text input with checkbox" bind:value={item} on:keydown={() => editItem(i, item)}>
          <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" on:click={() => removeItem(i)}>x</button>
            </div>
        </div>

			</li>
		{/each}
	</ul>
</li>

<script>
	import { remove } from './utils';
	let inputValue = '';
	
	const addItem = () => {
		updateList(listId, { items: [...items, inputValue] });
		inputValue = '';
	};

	const removeItem = (i) => {
		remove(items, i);
		updateList(listId, { items });
	};

	const editItem = (i, item) => {
	  items[i] = item;
	  updateList(listId, { items });
	};
	
	export let name = '';
	export let items = [];
	export let listId = 0;
	export let updateList;
</script>

<style>
	.list {
		list-style-type: none;
		padding: 10px;
	}
	
	.list__name {
		text-align: center;
	}
	
	.list__item {
		list-style-type: none;
	}

	.list__item-list {
		padding: 0;
	}
</style>