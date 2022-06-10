<template>
  <div class="todo-app">
    <header class="header">
      <span class="header__text">To-do list</span>
    </header>
    <add-task></add-task>
    <active-tasks></active-tasks>
    <div class="divider"></div>
    <completed-tasks></completed-tasks>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTasksStore } from "../stores/tasks";

import AddTask from "./AddTask.vue";
import ActiveTasks from "./ActiveTasks.vue";
import CompletedTasks from "./CompletedTasks.vue";

export default defineComponent({
  setup() {
    const tasksStore = useTasksStore();

    return {
      tasksStore,
    };
  },

  components: {
    AddTask,
    ActiveTasks,
    CompletedTasks,
  },

  beforeCreate() {
    this.tasksStore.fetchTasks();
  },
});
</script>

<style lang="sass">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap")

.todo-app
  display: flex
  flex-direction: column
  align-items: center

  margin: 0 140px

.header
  margin-top: 40px

  text-align: center

  &__text
    font-weight: 700
    font-size: 30px

    color: #535568

.divider
  width: 100%

  margin-top: 10px

  border: 1px solid #383A4C
</style>
