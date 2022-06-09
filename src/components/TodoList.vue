<template>
  <ul ref="todoList">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :title="todo.title"
      :todo="todo" />
  </ul>
</template>

<script>
import TodoItem from '~/components/TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      title: ''
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  watch: {
    todos: {
      handler() {
        this.getTodos()
      },
      deep: true
    }
  },
  created() {
    this.setTodos()
  },
  mounted() {
  },
  methods: {
    setTodos() {
      this.$store.dispatch('setTodos')
    },
    getTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }
}
</script>

<style scoped lang="scss">
ul {
  width: 100%;
}
</style>
