<template>
  <div class="todo-app">
    <header class="header">
      <span class="header__text">To-do list</span>
    </header>

    <form action="" class="add-task">
      <input type="text" name="" id="add-task" class="add-task__input" />
    </form>

    <section class="active-tasks" v-for="task in tasks" :key="task.id">
      <div class="active-tasks__task task">
        <span class="task__name">{{ task.task }}</span>
        <input type="checkbox" name="" id="" class="task__input" />
      </div>
      <button class="active-tasks__delete-button">
        <img src="./icons/cross.svg" alt="" />
      </button>
    </section>

    <section class="completed-tasks"></section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  data() {
    return {
      tasks: [
        {
          id: Date.now(),
          task: "Hello first task"
        },
        {
          id: Date.now(),
          task: "Hello second task"
        }
      ],
    };
  },
})

</script>

<style lang="sass">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap")

* 
  margin: 0
  padding: 0
  box-sizing: border-box

  font-family: "Inter"

html
  background-color: #222345

.header
  margin-top: 40px

  text-align: center

  &__text
    font-weight: 700
    font-size: 30px

    color: #535568

.add-task 
  
</style>

