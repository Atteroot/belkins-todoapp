<template>
  <form
    autocomplete="off"
    class="add-task"
    @submit.prevent="addTaskToStore"
  >
    <input
      id="add-task"
      v-model="taskName"
      type="text"
      class="add-task__input"
      placeholder="Add a task"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTasksStore } from '../stores/tasks';

export default defineComponent({
  setup() {
    const tasks = useTasksStore()
    const taskName = ref('')

    function addTaskToStore() {
      if (!taskName.value) return
      tasks.addTask(taskName.value)
      taskName.value = ''
    }

    return {
      tasks,
      taskName,
      addTaskToStore
    }
  },
})
</script>

<style scoped lang="sass">
.add-task
  width: 100%

  autocomplete: off

  &:focus
    color: #535568

  &__input
    width: 100%
    margin-top: 30px
    padding: 20px 20px 20px 60px

    border: 1px solid #535568
    border-radius: 10px

    background: url(src/icons/plus.svg) no-repeat 20px 20px

    font-weight: 400
    color: #7A7C8D

    &:focus
      color: #535568
</style>
