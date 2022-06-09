import { createStore } from "vuex";
import axios from "axios";

const END_POINT =
  "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";
const headers = {
  "Content-Type": "application/json",
  apikey: "FcKdtJs202204",
  username: "KDT2_InseokPark",
};

export default createStore({
  state() {
    return {
      todos: [],
      order: 0,
      loading: false,
    };
  },
  mutations: {
    setTodos(state, payload) {
      state.todos = payload;
      console.log(payload);
      state.order = Math.max(...payload.map((todo) => todo.order));
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex((todo) => todo.id === id);
      state.todos.splice(index, 1);
    },
    updateTodo(state, newTodos) {
      const { id } = newTodos;
      const index = state.todos.findIndex((todo) => todo.id === id);
      const todo = state.todos[index];
      for (const key in todo) {
        if (newTodos[key] !== undefined) {
          todo[key] = newTodos[key];
        }
      }
    },
    reorderTodos(state, { oldIndex, newIndex }) {
      const clone = { ...state.todos[oldIndex] };
      state.todos.splice(oldIndex, 1);
      state.todos.splice(newIndex, 0, clone);
    },
    loading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async readTodos({ commit }) {
      try {
        commit("loading", true);
        const res = await axios({
          url: END_POINT,
          method: "GET",
          headers,
        });
        console.log(res), commit("setTodos", res.data);
      } catch (error) {
        alert(error);
      } finally {
        commit("loading", false);
      }
    },
    async createTodo({ commit }, { title, order }) {
      const res = await axios({
        url: END_POINT,
        method: "POST",
        headers,
        data: {
          title,
          order,
        },
      });
      console.log(res);
      commit("addTodo", res.data);
    },
    async updateTodo({ commit }, { title, id, done, order }) {
      const res = await axios({
        url: `${END_POINT}/${id}`,
        method: "PUT",
        headers,
        data: {
          title,
          id,
          done,
          order,
        },
      });
      commit("updateTodo", res.data);
    },
    async deleteTodo({ commit }, id) {
      await axios({
        url: `${END_POINT}/${id}`,
        method: "DELETE",
        headers,
      });
      commit("deleteTodo", id);
    },
    async changeTodo({ state, commit }, event) {
      if (event !== undefined) {
        commit("reorderTodos", event);
      }
      const todoIds = state.todos.map((todo) => todo.id);
      await axios({
        url: `${END_POINT}/reorder`,
        method: "PUT",
        headers,
        data: {
          todoIds,
        },
      });
    },
  },
});
