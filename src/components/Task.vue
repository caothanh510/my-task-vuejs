<template>
  <alert :message="task_data.message" />
  <div v-if="task_data.currentTask" class="edit-form">
    <h4>Task</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="task_data.currentTask.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="task_data.currentTask.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ task_data.currentTask.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      v-if="task_data.currentTask.published"
      @click="updatePublished(false)"
      class="btn btn-warning"
    >
      UnPublish
    </button>
    <button v-else
      @click="updatePublished(true)"
      class="btn btn-primary"
    >
      Publish
    </button>

    <button style="margin-left: 10px;" type="submit" 
      @click="updateTask"
      class="btn btn-success"
    >
      Update
    </button>
    <p />
  </div>

  <div v-else>
    <br />
    <p>Please click on a Task to view...</p>
  </div>
</template>

<script>
import { Task } from "../composable/task";
import { onMounted } from "vue";
import { useRoute } from 'vue-router'
import Alert from "@/components/Alert";

const { task_data, getTask, updatePublished, updateTask } = Task();

export default {
  name: "task",
  components: {
    Alert
  },
  watch:{
    $route (to, from){
      task_data.message = '';
      getTask(to.params.id);
    }
  },
  setup() {
    const route = useRoute()

    onMounted(() => {
      task_data.message = '';
      getTask(route.params.id);
    })

    return {
      task_data, 
      getTask,
      updatePublished,
      updateTask 
    };
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>