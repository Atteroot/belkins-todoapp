<template>
  <todo-app />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoApp from './components/TodoApp.vue';

export default defineComponent({
  components: {
    TodoApp
  }
})
</script>

<style lang="sass">
* 
  margin: 0
  padding: 0
  box-sizing: border-box

  font-family: "Inter"
  outline: none

html
  background-color: #222435  
</style>
