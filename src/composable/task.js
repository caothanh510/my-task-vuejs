// eslint-disable-next-line no-unused-vars
import { ref, vue } from "vue";
import { ServiceFactory } from "./../services/service.factory"
const TaskServices = ServiceFactory.get("task")

export function Task() {
  let task_data = ref(
    {
      message: '',
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      title: "",
      task: {
        id: null,
        title: "",
        description: "",
        published: false
       },
      is_add_task: true
    }
  );

  // Task List
  function retrieveTasks() {
    TaskServices.getAll().onSnapshot((snapshotChange) => {
        var results = []
        snapshotChange.forEach((doc) => {
          results.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            published: doc.data().published,
          });
        });
        task_data.value.tasks = results;
    });
  }

  function setActiveTask(task, index) {
    task_data.value.currentTask = task;
    task_data.value.message = '';
    task_data.value.currentIndex = task ? index : -1;
  }
  
  function deleteTask() {
    TaskServices.delete(task_data.value.currentTask.id)
      .then(() => {
        task_data.value.currentTask = null;
        task_data.value.message = 'The status was deleted successfully!';
      })
      .catch(e => {
        console.log(e);
      });
  }

  function searchTitle() {
    TaskServices.search('title', task_data.value.title).then(response => {
      var results = []
      response.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          published: doc.data().published,
        });
      });
      task_data.value.tasks = results;
      setActiveTask(null);
    })
    .catch(e => {
      console.log(e);
    });
  }

  // Task
  function getTask(id) {
    TaskServices.edit(id)
      .then(response => {
        task_data.value.currentTask = {
          id: response.id,
          title: response.data().title,
          description: response.data().description,
          published: response.data().published
        }
        console.log('task_data.value.currentTask', task_data.value.currentTask)
      })
      .catch(e => {
        console.log(e);
      });
  }

  function updatePublished(status) {
    var data = {
      id: task_data.value.currentTask.id,
      title: task_data.value.currentTask.title,
      description: task_data.value.currentTask.description,
      published: status
    };

    TaskServices.update(task_data.value.currentTask.id, data)
      .then(() => {
        task_data.value.currentTask.published = status;
        task_data.value.message = 'The status was ' + (status ? 'published' : 'unpublished') + ' successfully!';
        setTimeout(function(){ window.location = '/' }, 1000);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function updateTask() {
    TaskServices.update(task_data.value.currentTask.id, task_data.value.currentTask)
      .then(() => {
        task_data.value.message = 'The task was updated successfully!';
        setTimeout(function(){ window.location = '/' }, 1000);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Add Task
  function saveTask() {
    var data = {
      title: task_data.value.task.title,
      description: task_data.value.task.description
    };

    TaskServices.create(data).then(() => {
      task_data.value.is_add_task = false;
      task_data.value.task = {};
      task_data.value.message = 'The status was created successfully!';
      
      setTimeout(function(){ window.location = '/' }, 1000);
    }).catch((error) => {
        console.log(error);
    });
  }
  
  
  function newTask() {
    task_data.value.is_add_task = true;
    task_data.value.task = {};
  }

  return {
    task_data,
    // Task List
    retrieveTasks,
    setActiveTask,
    deleteTask,
    searchTitle,
    // Task
    getTask,
    updatePublished,
    updateTask,
    // Add Task
    saveTask,
    newTask
  };
}
