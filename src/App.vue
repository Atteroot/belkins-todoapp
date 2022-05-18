<template>
  <div class="todo-app">
    <header class="header">
      <span class="header__text">To-do list</span>
    </header>

    <form
      autocomplete="off"
      class="add-task"
      @submit.prevent
    >
      <input
        id="add-task"
        v-model="newTask"
        type="text"
        class="add-task__input"
        placeholder="Add a task"
        v-on:keydown.enter="addTask" 
      />
    </form>

    <section class="active-tasks">
      <div
        v-for="task in progressOfTasks('uncompleted')"
        :key="task.id"
        class="active-tasks__task task"
      >
        <div class="task__desc desc">
          <img
            src="./icons/task-uncompleted.svg"
            class="desc__check"
            @click="completeTask(task)"
          />
          <input
            :value="task.task"
            v-on:keypress.enter="saveTask(task)"
            class="desc__name"
            @input="this.editedTask = $event.target.value"
          />
        </div>
        <button class="active-tasks__delete-button" @click="deleteTask(task)">
          <img src="./icons/cross.svg"/>
        </button>
      </div>
    </section>

    <div class="divider"></div>

    <div class="completed-icon">
      <img src="./icons/completed-check.svg" class="completed-icon__icon">
      <span class="completed-icon__text">Completed</span>
    </div>

    <section class="completed-tasks">
      <div
        v-for="task in progressOfTasks('completed')"
        :key="task.id"
        class="completed-tasks__task task"
      >
        <div class="task__desc desc">
          <img
            src="./icons/task-completed.svg"
            class="desc__check"
            @click="completeTask(task)"
          />
          <span class="desc__name desc__name--completed">{{ task.task }}</span>
        </div>
        <button class="active-tasks__delete-button">
          <img src="./icons/cross.svg" @click="deleteTask(task)"/>
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  data() {
    return {
      newTask: '',
      editedTask: '',
      tasks: [
        // {
        //   id: 1,
        //   task: "Hello first task",
        //   completed: false
        // },
        // {
        //   id: 2,
        //   task: "Hello second task",
        //   completed: false
        // },
        // {
        //   id: 3,
        //   task: "Hello first completed task",
        //   completed: true
        // },
        // {
        //   id: 4,
        //   task: "Hello second completed task",
        //   completed: true
        // },
        {
          id: 1,
          task: "",
          completed: false
        },
      ],
    };
  },

  methods: {
    addTask(): void {
      this.tasks.unshift({
        id: Date.now(),
        task: this.newTask,
        completed: false
      });
      this.newTask = '';
    },

    progressOfTasks(status: string) {
      if (this.tasks.length > 1) {
        if (status == 'uncompleted') {
          return this.tasks.filter(el => !el.completed)
        } else {
          return this.tasks.filter(el => el.completed)
        }
      }
      
    },

    deleteTask(task: {id: number, task: string}): void {
      this.tasks = this.tasks.filter(el => el.id !== task.id)
    },

    completeTask(task): void {
      task.completed = !task.completed
    },

    saveTask(task): void {
      const taskId = this.tasks.findIndex(el => el.id === task.id)
      console.log(taskId);
      
      this.tasks[taskId].task = this.editedTask
    }
  }
})

</script>

<style lang="sass">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap")

* 
  margin: 0
  padding: 0
  box-sizing: border-box

  font-family: "Inter"
  outline: none

html
  background-color: #222435

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

.add-task
  width: 100%

  autocomplete: off

  &__input
    width: 100%
    margin-top: 30px
    padding: 20px 20px 20px 60px

    border: 1px solid #535568
    border-radius: 10px

    background: url(icons/plus.svg) no-repeat 20px 20px

    font-weight: 400
    color: #7A7C8D

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

.divider
  width: 100%

  margin-top: 10px

  border: 1px solid #383A4C

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

