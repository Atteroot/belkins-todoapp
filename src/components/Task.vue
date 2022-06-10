<template>
  <div class="active-tasks__task task">
    <div class="task__desc desc">
      <img
        src="../icons/task-uncompleted.svg"
        class="desc__check"
        @click="markTaskAsCompleted()"
      />

      <input
        v-model="editedTask"
        class="desc__name"
        @keypress.enter="renameTask()"
        @focusout="renameTask()"
      />
    </div>
    <button
      class="active-tasks__delete-button"
      @click="tasksStore.removeTask(task)"
    >
      <img src="../icons/cross.svg" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useTasksStore, Task, url } from "../stores/tasks";

export default defineComponent({
  setup() {
    const tasksStore = useTasksStore();

    return {
      tasksStore,
    };
  },

  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },

  data() {
    return {
      editedTask: this.task.task,
    };
  },

  methods: {
    async renameTask() {
      if (this.task.task === this.editedTask) return;

      await this.tasksStore.editTask(this.task, this.editedTask);

      await this.tasksStore.fetchTasks();
    },

    markTaskAsCompleted() {
      this.tasksStore.completeTask(this.task);
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
