<template>
  <alert :message="task_data.message" />
  <div class="list row d-flex" v-if="task_data.is_add_task">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="task_data.title"/>
        <div class="input-group-append">
          <button class="btn btn-primary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row ">
        <div class="col-md-6">
          <h4>Tasks List</h4>
        </div>
        <div class="col-md-6 d-flex justify-content-end">
          <router-link to="/add" @click="newTask" class="btn btn-primary">Add +</router-link>
        </div>
      </div>
      <br />
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == task_data.currentIndex }"
          v-for="(task, index) in task_data.tasks"
          :key="index"
          @click="setActiveTask(task, index)"
        >
          <strong>Task: </strong> {{ task.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="task_data.currentTask">
        <h4>Task</h4>
        <div>
          <label><strong>Title:</strong></label> {{ task_data.currentTask.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ task_data.currentTask.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ task_data.currentTask.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/tasks/' + task_data.currentTask.id" class="btn btn-sm btn-warning">Edit</router-link>
        <button style="margin-left: 5px;" @click="deleteTask()" class="btn btn-sm btn-danger">Delete</button>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Task to view...</p>
      </div>
    </div>
  </div>
  <hr />
</template>

<script>
import { Task } from "../composable/task";
import { onMounted, ref, reactive } from "vue";
import Alert from "@/components/Alert";

export default {
  name: "task-list",
  components: {
    Alert
  },
  setup() {
    const { task_data, retrieveTasks, setActiveTask, deleteTask, searchTitle, newTask } = Task();

    onMounted(() => {
      retrieveTasks();
    })
    
    return {
      task_data,
      retrieveTasks,
      setActiveTask,
      deleteTask,
      searchTitle
    };
  }
  
};
</script>

<style>
.list {
  text-align: left;
  margin: auto;
}
</style>