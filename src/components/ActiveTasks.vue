<template>
  <section class="active-tasks">
    <Ttask v-for="task in uncomplitedTasks" :task="task" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTasksStore, Task, url } from "../stores/tasks";
import Ttask from "./Task.vue";

export default defineComponent({
  components: { Ttask },
  setup() {
    const tasksStore = useTasksStore();

    return {
      tasksStore,
    };
  },

  computed: {
    uncomplitedTasks(): Task[] {
      return this.tasksStore.allTasks.filter((task) => !task.completed);
    },
  },
});
</script>

<style lang="sass">
.active-tasks
  width: 100%
  margin-top: 10px

  &__delete-button
    border: none
    background-color: #383a4c
    margin: 20px

    cursor: pointer

.task
  display: flex
  justify-content: space-between

  margin: 10px 0

  background-color: #383a4c
  border-radius: 10px

  color: white

  font-weight: 500

.desc
  display: flex
  align-items: center

  width: 100%

  &__check
    margin: 20px

    cursor: pointer

  &__name
    width: 100%

    border: none
    background-color: #383A4C

    color: white

    font-weight: 500
    font-size: 16px
    &--completed
      color: #9799AD
      text-decoration-line: line-through
</style>
