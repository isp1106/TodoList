<template>
  <div class="todo-wrap">
    <h1 class="todo-tit">
      Todo List
    </h1>
    <div class="todo-search">
      <form
        class="form"
        @submit.prevent>
        <input
          id="todo-search__ipt"
          type="text"
          class="form-input"
          autocomplete="off"
          placeholder=" "
          :value="title"
          @input="title = $event.target.value"
          @keydown.enter="createTodo" />
        <label
          for="todo-list"
          class="form-placeholder">
          Enter Todo
        </label>
      </form>
      <div class="todo-search-btn">
        <button 
          @click="createTodo">
        </button>
        <div class="todo-search-btn-ico">
          <font-awesome-icon
            icon="plus-circle"
            style="cursor: pointer; color: #fff; width: 24px; height: 24px;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {
    createTodo() {
      if(!this.title.trim()) {
        return
      }
      const data = {
        title: this.title,
        order: this.$store.state.order += 1
      }
      this.$store.dispatch('createTodo', data)
      this.title = ''
    }
  }
}
</script>

<style scoped lang="scss">
.todo-wrap {
  position: relative;
  .todo-tit {
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
  }
  .todo-search {
    margin: 20px 0;
    display: flex;
    flex-wrap: nowrap;
    position:relative;
    .form {
      position: relative;
      width: 500px;
      height: 36px;
      .form-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid #fff;
        border-radius: 5px;
        color: #fff;
        outline: none;
        background: none;
        box-sizing: border-box;
        padding-left:20px;
      }
      .form-placeholder {
        position: absolute;
        left: 16px;
        top: 12px;
        padding: 0 8px;
        color: #fff;
        cursor: text;
      }
    }
    .form-input:focus ~ .form-placeholder,
    .form-input:not(:placeholder-shown).form-input:not(:focus) ~ .form-placeholder {
      font-size: 0;
    }
  }
}
.todo-search-btn {
  position: absolute;
  left: 100%;
  top: 0;
  bottom: 0;
  margin: auto;
  button {
    width: 36px;
    height: 36px;
    position: absolute;
    left:0;
    top:0;
    opacity: 0;
    cursor: pointer;
  }
  .todo-search-btn-ico {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
}
</style>
