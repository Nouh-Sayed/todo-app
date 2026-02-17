let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksdiv = document.querySelector(".tasks");

let arrayOfTasks = [];

// load data
getDatafromlocalstorge();

document.addEventListener("DOMContentLoaded", function () {

  submit.disabled = true;

  input.onkeyup = function () {
    submit.disabled = input.value.length <= 5;
  };

  submit.onclick = function () {
    if (input.value !== "") {
      addTaskToArray(input.value);
      input.value = "";
      submit.disabled = true;
    }
  };

});

// click events (delete + complete)
tasksdiv.addEventListener("click", (e) => {

  // delete
  if (e.target.classList.contains("del")) {
    let taskId = e.target.parentElement.getAttribute("data-id");
    deletetaskwith(taskId);
  }

  // toggle complete
  if (e.target.classList.contains("task")) {
    toggleStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }

});

// add task
function addTaskToArray(tasktext) {

  const task = {
    id: Date.now(),
    title: tasktext,
    completed: false,
  };

  arrayOfTasks.push(task);

  addElementsToPage(arrayOfTasks);
  addDatatolocalstorgefrom(arrayOfTasks);
}

// display tasks
function addElementsToPage(arrayOfTasks) {

  tasksdiv.innerHTML = "";

  arrayOfTasks.forEach((task) => {

    let div = document.createElement("div");
    div.className = task.completed ? "task done" : "task";
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));

    div.appendChild(span);
    tasksdiv.appendChild(div);
  });

}

// save data
function addDatatolocalstorgefrom(arrayOfTasks){
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// load data
function getDatafromlocalstorge(){
  let data = window.localStorage.getItem("tasks");

  if (data){
    arrayOfTasks = JSON.parse(data);
    addElementsToPage(arrayOfTasks);
  }
}

// delete task
function deletetaskwith(taskId){
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDatatolocalstorgefrom(arrayOfTasks);
  addElementsToPage(arrayOfTasks);
}

// toggle completed
function toggleStatus(taskId){

  arrayOfTasks.forEach((task) => {
    if (task.id == taskId){
      task.completed = !task.completed;
    }
  });

  addDatatolocalstorgefrom(arrayOfTasks);

}
