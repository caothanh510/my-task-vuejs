import TaskService from "./task.service"

const repositories = {
  task: TaskService
}

export const ServiceFactory = {
  get: name => repositories[name],
}
