import { defineStore } from 'pinia'

interface Task {
  id: number,
  task: string,
  completed: boolean
}

export const useTasksStore = defineStore({
  id: 'tasks',

  state: () => ({
    allTasks: [] as any,
  }),

  actions: {
    addTask(task: string): number {
      return this.allTasks.unshift({
        id: Date.now() as number,
        task: task,
        completed: false
      })
    },

    removeTask(task: Task) {
      const taskId: number = this.allTasks.lastIndexOf(task)
      if(taskId > -1) this.allTasks.splice(taskId, 1)
    },

    completeTask(task: Task) {
      task.completed = !task.completed
    },

    renameTask(task: Task, editedTask: string) {
      const taskId: number = this.allTasks.lastIndexOf(task)

      return this.allTasks[taskId].task = editedTask
    }
  }
})
