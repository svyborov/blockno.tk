<li class='list'>
	<h4 class='list__name'>{name}</h4>
	<form on:submit|preventDefault={addItem}>
		<input type='text' class='list__item-input' placeholder="new item" bind:value={inputValue} >	
	</form>
	<ul>
		{#each items as item}
			<li class='list__item'>
				<input type="checkbox">
				{item}
			</li>
		{/each}
	</ul>
</li>

<script>
	let inputValue = '';
	
	const addItem = () => {
		updateList(listId, { items: [...items, inputValue] })
		inputValue = '';
	}
	
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
</style>