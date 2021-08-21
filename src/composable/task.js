// eslint-disable-next-line no-unused-vars
import { ref, vue } from "vue";
import log from "./log_error"
import { ServiceFactory } from "./../services/service.factory"
const TaskServices = ServiceFactory.get("task")

export function Task() {
  let task_data = ref(
    {
      message: '',
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      search_title: "",
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
  const retrieveTasks = async () => {
    try{
      var resp = await TaskServices.getAll()
      if(resp){
        resp.onSnapshot((docs) => {
          let results = []
          docs.forEach((doc) => {
            results.push({
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              published: doc.data().published,
            });
          });
          task_data.value.tasks = results;
        })
      }
    }catch(e){
      console.log(e)
    }
  }

  function setActiveTask(task, index) {
    task_data.value.currentTask = task;
    task_data.value.message = '';
    task_data.value.currentIndex = task ? index : -1;
  }
  
  const deleteTask = async (id) => {
    var [err, resp] = await log(TaskServices.delete(id))

    if (err) {
      console.log('Error:', err);
    }else{
      task_data.value.currentTask = null;
      task_data.value.message = 'The status was deleted successfully!';
    }
  }

  const searchTitle = async () => {
    var [err, resp] = await log(TaskServices.search('title', task_data.value.search_title))

    if(resp){
      let results = []
      resp.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          published: doc.data().published,
        });
      });
      task_data.value.tasks = results;
      setActiveTask(null);
    }

    if (err) {
      console.log('Error:', err);
    }
  }

  // Task
  const getTask = async (id) => {
    var [err, resp] = await log(TaskServices.edit(id))

    if(resp){
      task_data.value.currentTask = {
        id: resp.id,
        title: resp.data().title,
        description: resp.data().description,
        published: resp.data().published
      }
    }

    if (err) {
      console.log('Error:', err);
    }
  }

  const updatePublished = async (status) => {
    let data = {
      id: task_data.value.currentTask.id,
      title: task_data.value.currentTask.title,
      description: task_data.value.currentTask.description,
      published: status
    };
    var [err, resp] = await log(TaskServices.update(data.id, data))

    if (err) {
      console.log('Error:', err);
    }else{
      task_data.value.currentTask.published = status;
      task_data.value.message = 'The status was ' + (status ? 'published' : 'unpublished') + ' successfully!';
      setTimeout(function(){ window.location = '/' }, 1000);
    }
  }

  const updateTask = async () => {
    var [err, resp] = await log(TaskServices.update(task_data.value.currentTask.id, task_data.value.currentTask))

    if (err) {
      console.log('Error:', err);
    }else{
      task_data.value.message = 'The task was updated successfully!';
      setTimeout(function(){ window.location = '/' }, 1000);
    }
  }

  const saveTask = async () => {
    let data = {
      title: task_data.value.task.title,
      description: task_data.value.task.description
    };
    var [err, resp] = await log(TaskServices.create(data))

    if(resp){
      task_data.value.is_add_task = false;
      task_data.value.task = {};
      task_data.value.message = 'The status was created successfully!';
      setTimeout(function(){ window.location = '/' }, 1000);
    }

    if (err) {
      console.log('Error:', err);
    }
  }
  
  function newTask() {
    task_data.value.is_add_task = true;
    task_data.value.task = {};
  }

  return {
    task_data,
    retrieveTasks,
    setActiveTask,
    deleteTask,
    searchTitle,
    getTask,
    updatePublished,
    updateTask,
    saveTask,
    newTask
  };
}
