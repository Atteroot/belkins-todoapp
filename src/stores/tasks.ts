import { defineStore } from 'pinia'

interface Task {
  _id: string,
  task: string,
  completed: boolean
}

const url = 'https://belkins-todo-app.herokuapp.com/tasks';

export const useTasksStore = defineStore({
  id: 'tasks',

  state: () => ({
    allTasks: [] as any,
  }),

  actions: {
    fetchTasks() {
      fetch(url)
        .then(res => res.json())
        .then(data => this.allTasks = data.reverse())
    },

    addTask(task: string): void {
      const data = {
        task: task,
        completed: false
      }

      fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }
      ).then(res => this.fetchTasks())
    },

    removeTask(task: Task): void {
      fetch(`${url}/${task._id}`, {
        method: 'DELETE'
      }).then(res => this.fetchTasks())
    },

    completeTask(task: Task) {
      fetch(`${url}/status/${task._id}`, {
        method: 'PATCH'
      }).then(res => this.fetchTasks())
    },
  }
})
