const formEl = document.querySelector('#form');
const buttonEl = document.querySelector('#add-btn');
const inputEl = document.querySelector('#input');
const listEl = document.querySelector('#list');
const msgEl = document.querySelector('#msg');


const tasks = []; // Array to store tasks


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
  const newTask = { id: Math.floor(Math.random() * 10000), taskName: inputValue };
  
  // Create a new list item
  const liEl = document.createElement('li');
  liEl.setAttribute('data-id', newTask.id);

  liEl.innerHTML = `
    <div class="left">
      <input type="checkbox" id='checkbox'>
      <p id='text'>${inputValue}</p>
    </div>
    <div class="right">
      <button class="edit-btn" onclick="editTask(${newTask.id})">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${newTask.id})">Delete</button>
    </div>
  `;

  listEl.appendChild(liEl);
  inputEl.value = ""; 
  
  // Add the task to the tasks array
  tasks.push(newTask);
  
  const checkbox = liEl.querySelector('#checkbox');
  const text = liEl.querySelector('#text');
  
  // Add event listener to the checkbox for line-through functionality
  checkbox.addEventListener('click', (e) => {
    if (e.target.checked) {
      text.style.textDecoration = "line-through";
    } else {
      text.style.textDecoration = "none";
    }
  });
};

// Function to delete task by id
function deleteTask(taskId) {
  const updateTask = tasks.filter((task) => task.id !== taskId);
  
  // Remove the corresponding task from the DOM
  const taskEl = document.querySelector(`li[data-id='${taskId}']`);
  if (taskEl) {
    taskEl.remove();
  }
}

// Function to edit task by id
function editTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId); 
  if (taskIndex === -1) return; 

  const newTaskName = prompt("Edit your task:", tasks[taskIndex].taskName); 

  if (newTaskName !== null && newTaskName.trim() !== "") {
    // Check for duplicate tasks with the same name
    const existingTask = tasks.find(task => task.taskName === newTaskName);
    console.log(existingTask);
    if (existingTask && existingTask.id !== taskId) {
      msgEl.innerHTML = "Task already exists!";
      return; 
    }

    // Update the task name in the array
    tasks[taskIndex].taskName = newTaskName.trim();

    // Update the text in the UI
    const taskEl = document.querySelector(`li[data-id='${taskId}']`);
    if (taskEl) {
      const textEl = taskEl.querySelector('#text');
      textEl.innerText = newTaskName.trim();
      msgEl.innerHTML = ""; 
    }
  } else {
    msgEl.innerHTML = "Task name cannot be empty!";
  }
}

// Event listener for form submission
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});
