<li class='list'>
	<h4 class='list__name'>{name}</h4>
	<form on:submit|preventDefault={addItem}>
		<input type='text' class='list__item-input' placeholder="new item" bind:value={inputValue} >	
	</form>
	<ul class="list__item-list">
		{#each items as item, i}
			<li class='list__item d-flex mb-3'>
				<input class="list__item-checkbox p-2" type="checkbox">
				<span class="list__item-text p-2">{item}</span>
				<input type="button" class="list__item-delete-btn ml-auto" value="x" on:click={() => removeItem(i)}>
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
		updateList(listId, { items: items });
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