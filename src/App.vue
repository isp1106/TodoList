<template>
  <main>
    <section class="section">
      <CreateTodo />
      <TodoList />
    </section>
  </main>
</template>

<script>
import CreateTodo from '~/components/CreateTodo.vue'
import TodoList from '~/components/TodoList.vue'

export default {
  components: {
    CreateTodo,
    TodoList
  }
}
</script>

<style scoped lang="scss">
@import url('https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.css');

main {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./images/0.jpg') no-repeat center center / cover;
}
.section {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
}
button {
  border: none;
  background: none;
  outline: none;
}
</style>