<template>
  <alert :message="task_data.message" />
  <div class="form-group submit-form bg-light" v-if="task_data.is_add_task">
    <h3>New Task</h3>
    <div class="form-group">
      <label for="title">Title</label>
      <input
        type="text"
        class="form-control"
        id="title"
        required
        v-model="task_data.task.title"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <input
        class="form-control"
        id="description"
        required
        v-model="task_data.task.description"
        name="description"
      />
    </div>
    <p />
    <button @click="saveTask" class="btn btn-primary">Submit</button>
    <p />
  </div>
</template>

<script>
import { Task } from "../composable/task";
import Alert from "@/components/Alert";

export default {
  name: "add-task",
  components: {
    Alert
  },
  setup() {
    const { task_data, saveTask } = Task();

    return {
      task_data,
      saveTask
    };
  }
};
</script>

<style>
.submit-form {
  max-width: 500px;
  margin: auto;
}
</style>