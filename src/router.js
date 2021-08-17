import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    name: "list-task"
  },
  {
    path: "/add",
    name: "add-task",
    component: () => import('@/components/AddTask')
  },
  {
    path: '/tasks/:id',
    name: 'edit-task',
    component: () => import('@/components/Task')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
