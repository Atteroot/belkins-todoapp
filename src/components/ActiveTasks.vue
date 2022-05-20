<template>
  <section class="active-tasks">
    <div
      v-for="task in filterUncomplitedTasks()"
      class="active-tasks__task task"
      :key="task._id"
    >
      <div class="task__desc desc">
        <img
          src="../icons/task-uncompleted.svg"
          class="desc__check"
          @click="tasksStore.completeTask(task)"
        />
        <input
          :value="task.task"
          v-on:keypress.enter="(this as any).renameTask(task, (this as any).editedTask)"
          class="desc__name"
          @input="(this as any).editedTask = ($event.target as HTMLTextAreaElement).value"
          @focusout="(this as any).renameTask(task, (this as any).editedTask)"
        />
      </div>
      <button class="active-tasks__delete-button" @click="tasksStore.removeTask(task)">
        <img src="../icons/cross.svg"/>
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTasksStore } from '../stores/tasks';

const url = 'https://belkins-todo-app.herokuapp.com/tasks';

interface Task {
  _id: string,
  task: string,
  completed: boolean
}

export default defineComponent({
  setup() {
    const tasksStore = useTasksStore();
    const editedTask: any = ref('');

    return {
      tasksStore,
      editedTask,
    }
  },

  methods: {
    filterUncomplitedTasks(): Array<Task>{
      return this.tasksStore.allTasks.filter((el: any) => !el.completed)
    }, 

    renameTask(task: Task, editedTask: string): void {
      if (editedTask.length) {
        fetch(`${url}/${task._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task: editedTask })
        })
        .then(res => {
          this.tasksStore.fetchTasks();
          this.editedTask = '';
          }
        )
      }
    },
  },
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
