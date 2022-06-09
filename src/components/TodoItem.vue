<template>
  <li>
    <label class="handle">
      <input
        type="checkbox"
        class="checkbox"
        :checked="todo.done"
        @click="checked" />
      <div class="icon-box">
        <font-awesome-icon icon="check" color="#fff" />
      </div>
    </label>
    <template v-if="!editMode">
      <span
        class="title"
        :class="{ done: todo.done }">
        {{ todo.title }}
      </span>
      <span class="updatedAt">
        {{ todo.updatedAt.slice(0, 10) }}
      </span>
      <div class="btn-area">
        <button 
          @click.stop="onEditMode">
        </button>
        <div class="btn-ico-area">
          <font-awesome-icon
            icon="pen"
            style="cursor: pointer; color: #fff; width: 24px; height: 24px;" />
        </div>
      </div>
      <div class="btn-area">
        <button
          @click="deleteTodo(todo.id)">
        </button>
        <div class="btn-ico-area">
          <font-awesome-icon
            icon="circle-minus"
            style="cursor: pointer; color: #fff; width: 24px; height: 24px;" />
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="edit-wrap"
        @click.stop>
        <input
          ref="titleInput"
          class="edit-ipt"
          :value="title"
          @input="title=$event.target.value"
          @keydown.enter="offEditMode(); updateTodo()"
          @keydown.esc="offEditMode" />
        <div class="btn-area">
          <button
            @click="offEditMode(); updateTodo()">
          </button>
          <div class="btn-ico-area">
            <font-awesome-icon
              icon="save"
              style="cursor: pointer; color: #fff; width: 24px; height: 24px;" />
          </div>
        </div>
        <div class="btn-area">
          <button 
            @click="offEditMode">
          </button>
          <div class="btn-ico-area">
            <font-awesome-icon
              icon="times-circle"
              style="cursor: pointer; color: #fff; width: 24px; height: 24px;" />
          </div>
        </div>
      </div>
    </template>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editMode: false
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  methods: {
    async onEditMode() {
      this.editMode = true
      this.title = this.todo.title
      window.addEventListener('click', this.offEditMode)
      await this.$nextTick()
      this.$refs.titleInput.focus()
    },
    offEditMode() {
      this.editMode = false
      window.removeEventListener('click', this.offEditMode)
    },
    updateTodo() {
      const data = {
        title: this.title,
        id: this.todo.id,
        order: this.todo.order,
        done: this.todo.done
      }
      this.$store.dispatch('updateTodo', data)
    },
    deleteTodo(id) {
      this.$store.dispatch('deleteTodo', id)
    },
    checked(event) {
      const data = {
        title: this.todo.title,
        id: this.todo.id,
        order: this.todo.order,
        done: event.target.checked
      }
      this.$store.dispatch('updateTodo', data)
    }
  }
}
</script>

<style scoped lang="scss">
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding:10px;
  background:rgba(1, 1, 1, .5);
  &:not(:first-child){
    margin-top:10px;
  }
  .title, .edit-ipt {
    color: #fff;
    flex-grow: 1;
    font-size: 18px;
  }
  .done {
    color: rgba($color: #fff, $alpha: 0.7);
    text-decoration: line-through;
  }
  .updatedAt {
    margin-right: 10px;
    font-size: 12px;
    color:  rgba($color: #fff, $alpha: 0.7);
  }
}
label {
  position: relative;
  input[type="checkbox"] {
    width: 36px;
    height: 36px;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    margin: 0;
  }
  .icon-box {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
}
.edit-wrap {
  width: 100%;
  flex-grow: 1;
  display: flex;
  .edit-ipt {
    position: relative;
    top: 2px;
    width: 100px;
    border: 2px solid #fff;
    border-radius: 10px;
    color: #fff;
    outline: none;
    background: none;
  }
}
.btn-area {
  position: relative;
  button {
    width: 36px;
    height: 36px;
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .btn-ico-area {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
}
</style>
