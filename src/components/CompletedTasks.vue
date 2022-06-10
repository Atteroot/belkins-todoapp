<template>
  <div v-if="tasksExsists">
    <div class="completed-icon">
      <img src="../icons/completed-check.svg" class="completed-icon__icon" />
      <span class="completed-icon__text">Completed</span>
    </div>

    <section class="completed-tasks">
      <div
        v-for="task in complitedTasks"
        :key="task._id"
        class="completed-tasks__task task"
      >
        <div class="task__desc desc">
          <img
            src="../icons/task-completed.svg"
            class="desc__check"
            @click="tasksStore.completeTask(task)"
          />
          <span class="desc__name desc__name--completed">{{ task.task }}</span>
        </div>
        <button class="active-tasks__delete-button">
          <img src="../icons/cross.svg" @click="tasksStore.removeTask(task)" />
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Task, useTasksStore } from "../stores/tasks";

export default defineComponent({
  setup() {
    const tasksStore = useTasksStore();

    return {
      tasksStore,
    };
  },

  computed: {
    complitedTasks(): Task[] {
      return this.tasksStore.allTasks.filter((el: any) => el.completed);
    },

    tasksExsists(): boolean {
      return !!this.complitedTasks.length;
    },
  },
});
</script>

<style lang="sass">
.completed-icon
  padding: 6px 8px
  margin-top: 20px
  margin-bottom: 10px

  background-color: #1E446E
  border-radius: 4px

  display: flex
  align-items: center
  align-self: flex-start

  &__icon
    width: 16px
    height: 16px
    margin-right: 10px

  &__text
    color: #4EA2FF

    font-weight: 500
    font-size: 14px

.completed-tasks
  width: 100%
</style>
