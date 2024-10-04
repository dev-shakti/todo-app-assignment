const formEl = document.querySelector('#form');
const buttonEl = document.querySelector('#add-btn');
const inputEl = document.querySelector('#input');
const listEl = document.querySelector('#list');
const msgEl = document.querySelector('#msg');

let tasks = []; // Array to store tasks

const renderTask = () => {
  const renderedHTML = tasks.map((task) => {
    return `<li data-id="${task.id}">
            <div class="left">
                <input type="checkbox" ${task.completed ? "checked" : ""} id='checkbox' onclick="toggleTask(${task.id})">
                <p id='text'  style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.taskName}</p>
            </div>
            <div class="right">
              <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
              <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
          </li>`;
  }).join('');
  listEl.innerHTML = renderedHTML;
}

// Function to add a task
const addTask = () => {
  msgEl.innerHTML = "";
  const inputValue = inputEl.value.trim(); 

  // Check if the input is empty
  if (inputValue === "") {
    msgEl.innerHTML = "Task field cannot be empty";
    return; 
  }

  // Check for duplicate tasks based on taskName
  const existingTask = tasks.find(task => task.taskName === inputValue);
  if (existingTask) {
    msgEl.innerHTML = "Task already exists!";
    inputEl.value = "";
    return; 
  }

  // Generate a unique id for the task
  const newTask = { 
    id: Math.floor(Math.random() * 10000), 
    taskName: inputValue, 
    completed:false
  };
  
  // Add the task to the tasks array
  tasks.push(newTask);
  inputEl.value = "";
  console.log(tasks)
  renderTask()
};

//Function to delete task by id
function deleteTask(taskId) {
  const taskIndex=tasks.findIndex((task) => task.id===taskId)
  console.log(taskIndex)
  if(taskIndex!==-1){
    tasks.splice(taskIndex,1)
  }
  renderTask()
}


function toggleTask(taskId) {
  const taskIndex=tasks.findIndex((task) => task.id===taskId)
  console.log(taskIndex)
  if(taskIndex!==-1){
    tasks[taskIndex].completed=!tasks[taskIndex].completed
  }
  console.log(tasks)
  renderTask()
}

// Function to edit task by id
function editTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) return;

  const taskEl = document.querySelector(`li[data-id="${taskId}"]`);
  const textEl = taskEl.querySelector("#text");
  const editBtn = taskEl.querySelector(".edit-btn");

  // Check if the task is in edit mode (input field is visible)
  const isEditing = taskEl.querySelector("input[type='text']");

  if (!isEditing) {
    // Convert the task name into an input field
    textEl.innerHTML = `<input type="text" id="edit-input" value="${tasks[taskIndex].taskName}" />`;
    editBtn.innerText = "Save"; // Change the button text to "Save"
  } else {
    // Get the new task name from the input field
    const editInput = taskEl.querySelector("#edit-input");
    const newTaskName = editInput.value.trim();

    // Validate the new task name
    if (newTaskName !== "") {
      const existingTask = tasks.find(task => task.taskName === newTaskName);
      if (existingTask && existingTask.id !== taskId) {
        msgEl.innerHTML = "Task with this name already exists!";
        return;
      }

      // Update the task in the array
      tasks[taskIndex].taskName = newTaskName;
      msgEl.innerHTML = ""; // Clear any error message

      // Revert the input field back to normal text
      textEl.innerText = newTaskName;
      editBtn.innerText = "Edit"; // Change the button text back to "Edit"
    } else {
      msgEl.innerHTML = "Task name cannot be empty!";
    }
  }
}

// Event listener for form submission
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});
