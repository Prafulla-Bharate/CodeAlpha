// Get elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Event listener to add a task
addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;  // Ignore if input is empty

    // Create a new task element
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">X</button>
    `;
    
    // Add the task to the task list
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = "";

    // Add event listener for the delete button
    const deleteButton = li.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
        li.remove();
    });
});

// Optional: Persist tasks in localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll("li");
    taskItems.forEach(item => {
        tasks.push(item.querySelector("span").textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Optional: Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(taskText => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="delete-btn">X</button>
            `;
            taskList.appendChild(li);

            const deleteButton = li.querySelector(".delete-btn");
            deleteButton.addEventListener("click", function () {
                li.remove();
                saveTasks();
            });
        });
    }
}

// Call loadTasks on page load
window.addEventListener("load", loadTasks);

// Save tasks to localStorage on change
taskList.addEventListener("DOMSubtreeModified", saveTasks);
