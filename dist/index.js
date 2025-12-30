"use strict";
//Fetch each element from the local storage
const remainingTasks = [
    { title: 'Example Task 1', date: '2025-12-20' },
    { title: 'Example Task 2', date: '2025-12-20' }
];
const ongoingTasks = [
    { title: 'Example Task 3', date: '2025-12-20' },
    { title: 'Example Task 4', date: '2025-12-20' }
];
const completedTasks = [
    { title: 'Example Task 5', date: '2025-12-20' },
    { title: 'Example Task 6', date: '2025-12-20' }
];
let section1 = document.querySelector('.section-1-content');
let section2 = document.querySelector('.section-2-content');
let section3 = document.querySelector('.section-3-content');
function renderRemainingTasks() {
    if (!section1)
        return;
    section1.innerHTML = '';
    //Assigning ID to each task for the button element
    const remainingTasksWithId = remainingTasks.map((eachTask, index) => ({
        ...eachTask,
        id: index
    }));
    remainingTasksWithId.forEach(eachTask => {
        let content = document.createElement('div');
        content.innerHTML =
            `<div class="card-text">
                    <p class="card-title">${eachTask.title}</p>
                    <p class="card-date">Date: ${eachTask.date}</p>
                    </div>
                    <button class="card-button start-btn">Start Task</button>`;
        content.setAttribute('class', "card");
        content.querySelector('.start-btn')?.addEventListener('click', () => {
            startTask(eachTask.id);
        });
        section1?.appendChild(content);
    });
}
function renderOngoingTasks() {
    if (!section2)
        return;
    section2.innerHTML = '';
    //Assigning ID to each task for the button element
    const ongoingTasksWithId = ongoingTasks.map((eachTask, index) => ({
        ...eachTask,
        id: index
    }));
    ongoingTasksWithId.forEach(eachTask => {
        let content = document.createElement('div');
        content.innerHTML =
            `<div class="card-text">
                    <p class="card-title">${eachTask.title}</p>
                    <p class="card-date">Date: ${eachTask.date}</p>
                    </div>
                    <button class="card-button complete-btn">Complete Task</button>`;
        content.setAttribute('class', "card");
        content.querySelector('.complete-btn')?.addEventListener('click', () => {
            completeTask(eachTask.id);
        });
        section2?.appendChild(content);
    });
}
function renderCompletedTasks() {
    if (!section3)
        return;
    section3.innerHTML = '';
    //Assigning ID to each task for the button element
    const completedTasksWithId = completedTasks.map((eachTask, index) => ({
        ...eachTask,
        id: index
    }));
    completedTasksWithId.forEach(eachTask => {
        let content = document.createElement('div');
        content.innerHTML =
            `<div class="card-text">
                    <p class="card-title">${eachTask.title}</p>
                    <p class="card-date">Date: ${eachTask.date}</p>
                    </div>
                    <button class="card-button delete-btn">Delete Task</button>`;
        content.setAttribute('class', "card");
        content.querySelector('.delete-btn')?.addEventListener('click', () => {
            deleteTask(eachTask.id);
        });
        section3?.appendChild(content);
    });
}
//button functions
function startTask(taskId) {
    console.log('Checking if the id is passing', taskId);
    const task = remainingTasks[taskId];
    ongoingTasks.push(task);
    remainingTasks.splice(taskId, 1);
    renderRemainingTasks();
    renderOngoingTasks();
}
function completeTask(taskId) {
    console.log('Completing the task', taskId);
    const task = ongoingTasks[taskId];
    completedTasks.push(task);
    ongoingTasks.splice(taskId, 1);
    renderOngoingTasks();
    renderCompletedTasks();
}
function deleteTask(taskId) {
    console.log('deleting the task', taskId);
    completedTasks.splice(taskId, 1);
    renderCompletedTasks();
}
//display form
let handleAddTaskJS = document.querySelector('.handleAddTaskJS');
handleAddTaskJS?.addEventListener('click', handleAddTaskBtn);
function handleAddTaskBtn() {
    if (!handleAddTaskJS)
        return;
    const addSection = document.querySelector('.add-section');
    if (handleAddTaskJS.innerHTML === 'Add Task') {
        handleAddTaskJS.innerHTML = 'Cancel';
        handleAddTaskJS.style.backgroundColor = 'var(--button-background-red)';
        handleAddTaskJS.style.color = 'var(--text-white)';
        addSection.style.display = 'flex';
    }
    else {
        handleAddTaskJS.innerHTML = 'Add Task';
        handleAddTaskJS.style.backgroundColor = 'var(--button-background)';
        handleAddTaskJS.style.color = 'var(--text-color-dark)';
        addSection.style.display = 'none';
    }
}
//add task by handleing form submit
const formElement = document.querySelector(".add-section");
formElement?.addEventListener("submit", (e) => handleAddTask(e));
function handleAddTask(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    form.reset();
    const title = formData.get("title");
    const date = formData.get("date");
    const task = {
        title: title,
        date: date
    };
    remainingTasks.push(task);
    renderRemainingTasks();
}
// initially rendering everything to screen
renderRemainingTasks();
renderOngoingTasks();
renderCompletedTasks();
