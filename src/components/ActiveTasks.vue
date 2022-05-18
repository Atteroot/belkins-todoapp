<template>
  <section class="active-tasks">
      <div
        v-for="task in filterUncomplitedTasks()"
        class="active-tasks__task task"
      >
        <div class="task__desc desc">
          <img
            src="../icons/task-uncompleted.svg"
            class="desc__check"
            @click="tasksStore.completeTask(task)"
          />
          <input
            :value="task.task"
            v-on:keypress.enter="tasksStore.renameTask(task, this.editedTask)"
            class="desc__name"
            @input="this.editedTask = $event.target.value"
            @focusout="tasksStore.renameTask(task, this.editedTask)"
          />
        </div>
        <button class="active-tasks__delete-button" @click="tasksStore.removeTask(task)">
          <img src="../icons/cross.svg"/>
        </button>
      </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTasksStore } from '../stores/tasks';

export default defineComponent({
  setup() {
    const tasksStore = useTasksStore()

    return {
      tasksStore
    }
  },

  methods: {
    filterUncomplitedTasks() {
      return this.tasksStore.allTasks.filter(el => !el.completed)
    }
  }
})
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
