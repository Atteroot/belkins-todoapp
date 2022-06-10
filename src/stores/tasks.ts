import { defineStore } from "pinia";

export interface Task {
  _id: string;
  task: string;
  completed: boolean;
}

export const url = "https://belkins-todo-app.herokuapp.com/tasks";

export const useTasksStore = defineStore({
  id: "tasks",

  state: () => ({
    allTasks: [] as Task[],
  }),

  actions: {
    async fetchTasks() {
      return fetch(url)
        .then((res) => res.json())
        .then((data) => (this.allTasks = data.reverse()));
    },

    async addTask(task: string) {
      const data = {
        task: task,
        completed: false,
      };

      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => this.fetchTasks());
    },

    editTask(task: Task, editTask: string) {
      return fetch(`${url}/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: editTask }),
      });
    },

    async removeTask(task: Task) {
      return fetch(`${url}/${task._id}`, {
        method: "DELETE",
      }).then((res) => this.fetchTasks());
    },

    async completeTask(task: Task) {
      return fetch(`${url}/status/${task._id}`, {
        method: "PATCH",
      }).then((res) => this.fetchTasks());
    },
  },
});
