"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remainingTasks = [
    { title: 'Task 1', date: '2025-12-20' },
    { title: 'Task 2', date: '2025-12-20' }
];
const ongoingTasks = [
    { title: 'Task 3', date: '2025-12-20' },
    { title: 'Task 4', date: '2025-12-20' }
];
const completedTasks = [
    { title: 'Task 5', date: '2025-12-20' },
    { title: 'Task 6', date: '2025-12-20' }
];
let section1 = document.querySelector('.section-1');
let section2 = document.querySelector('.section-2');
let section3 = document.querySelector('.section-3');
remainingTasks.forEach(eachTask => {
    let content = document.createElement('div');
    content.innerHTML =
        `<div class="card-text">
                <p class="card-title">${eachTask.title}</p>
                <p class="card-date">Date: ${eachTask.date}</p>
                </div>
                <button class="card-button complete-btn">Complete Task</button>`;
    content.setAttribute('class', "card");
    section1?.appendChild(content);
});
//# sourceMappingURL=index.js.map