// Initialize the task list by fetching from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Listen for form submission to create a new task
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskDate = document.getElementById('taskDate').value;
    const taskText = document.getElementById('taskInput').value;

    if (taskDate && taskText) {
        addTask(taskDate, taskText);
        taskForm.reset(); // Clear the form
    }
});

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
        displayTask(task);
    });
}

// Add new task
function addTask(date, text) {
    const task = { id: Date.now(), date, text };
    const tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTask(task);
}

// Display task in the list
function displayTask(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');
    taskElement.setAttribute('data-id', task.id);
    
    taskElement.innerHTML = `
        <span>${task.date} - ${task.text}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;
    
    taskList.appendChild(taskElement);

    // Handle edit button
    taskElement.querySelector('.edit').addEventListener('click', function() {
        editTask(task);
    });

    // Handle delete button
    taskElement.querySelector('.delete').addEventListener('click', function() {
        deleteTask(taskElement, task.id);
    });
}

// Get tasks from localStorage
function getTasksFromStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

// Edit a task
function editTask(task) {
    const newDate = prompt('Edit the date:', task.date);
    const newText = prompt('Edit the task:', task.text);

    if (newDate && newText) {
        const tasks = getTasksFromStorage();
        const updatedTasks = tasks.map(t => {
            if (t.id === task.id) {
                t.date = newDate;
                t.text = newText;
            }
            return t;
        });

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        refreshTaskList();
    }
}

// Delete a task
function deleteTask(taskElement, taskId) {
    taskElement.remove();
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Refresh task list after edit
function refreshTaskList() {
    taskList.innerHTML = ''; // Clear the list
    loadTasks(); // Reload the list
}
