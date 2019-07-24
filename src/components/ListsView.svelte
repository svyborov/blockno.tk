<script>
  import TodoList from './TodoList';
  export let lists;
  export let items;
</script>

<div class="card-columns">
    {#each items as list, i}
      <TodoList {...list} listId={i} updateList={lists.updateList}></TodoList>
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