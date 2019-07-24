<script>
  let inputVal = '';
  const createList = () => {
    lists.addList({ name: inputVal, items: [], inTrash: false, inTrashFrom: null });
    inputVal = '';
  };
  export let lists;
  export let viewerState;

</script>

<div class="jumbotron text-center">
  <h1>Todo lists</h1>
  <div class="d-flex justify-content-center">
    <form on:submit|preventDefault={createList}>
      <input class="form-control form-control-lg" bind:value={inputVal} placeholder="list name">
    </form>
  </div>
  <button type="button" class="btn btn-danger" on:click={viewerState.toggleTrash}>В корзину</button>
</div>
