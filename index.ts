type TaskWithId ={
    id: number,
    title: string,
    date: string
}

type Task = Omit<TaskWithId, "id">;

//<!TODO> - Fetch everything from local storage
const remainingTasks: Array<Task> = [
];
const ongoingTasks: Array<Task> = [
    {title: 'Example Task 3', date: '2025-12-20'},
    {title: 'Example Task 4', date: '2025-12-20'}
];
const completedTasks: Array<Task> = [
    {title: 'Example Task 5', date: '2025-12-20'},
    {title: 'Example Task 6', date: '2025-12-20'}
];
 
let section1 = document.querySelector('.section-1-content');
let section2 = document.querySelector('.section-2-content');
let section3 = document.querySelector('.section-3-content');

function renderRemainingTasks():void{
    if(!section1) return;
    section1.innerHTML='';

    //Assigning ID to each task for the button element
    const remainingTasksWithId: Array<TaskWithId> = remainingTasks.map((eachTask, index) =>({
        ...eachTask,
        id: index
    }));

    if(remainingTasksWithId.length===0){
        let content=document.createElement('div');
        content.innerHTML='<p>No Remaining Tasks</p><p>Add A New Task To Schedule It</p>';
        content.setAttribute('class','empty-section')
        section1.appendChild(content);
    }
    else{
        remainingTasksWithId.forEach(eachTask=>{
            let content=document.createElement('div');
            content.innerHTML= 
                        `<div class="card-text">
                        <p class="card-title">${eachTask.title}</p>
                        <p class="card-date">Date: ${eachTask.date}</p>
                        </div>
                        <button class="card-button start-btn">Start Task</button>`
                    
            content.setAttribute('class',"card");
            content.querySelector('.start-btn')?.addEventListener('click',()=>{
                startTask(eachTask.id);
                })
            section1?.appendChild(content);
            }
        )
    }
}

function renderOngoingTasks():void{
    if(!section2) return;
    section2.innerHTML='';

    //Assigning ID to each task for the button element
    const ongoingTasksWithId: Array<TaskWithId> = ongoingTasks.map((eachTask, index)=>({
        ...eachTask,
        id: index
    }));

    if(ongoingTasksWithId.length===0){
        let content=document.createElement('div');
        content.innerHTML='<p>No Ongoing Tasks</p><p>Select A Task To Start Working</p>';
        content.setAttribute('class','empty-section')
        section2.appendChild(content);
    }
    else{
        ongoingTasksWithId.forEach(eachTask=>{
            let content=document.createElement('div');
            content.innerHTML= 
                        `<div class="card-text">
                        <p class="card-title">${eachTask.title}</p>
                        <p class="card-date">Date: ${eachTask.date}</p>
                        </div>
                        <button class="card-button complete-btn">Complete Task</button>`
                    
            content.setAttribute('class',"card");
            content.querySelector('.complete-btn')?.addEventListener('click',()=>{
                completeTask(eachTask.id);
            })
            section2?.appendChild(content);
            }
        )
    }
}

function renderCompletedTasks():void{
        if(!section3) return;
    section3.innerHTML='';

    //Assigning ID to each task for the button element
    const completedTasksWithId: Array<TaskWithId> = completedTasks.map((eachTask, index)=>({
        ...eachTask,
        id: index
    }));

    if(completedTasksWithId.length===0){
        let content=document.createElement('div');
        content.innerHTML='<p>No Tasks Completed</p><p>Completed Task Appear Here</p>';
        content.setAttribute('class','empty-section')
        section3.appendChild(content);
    }
    else{
        completedTasksWithId.forEach(eachTask=>{
            let content=document.createElement('div');
            content.innerHTML= 
                        `<div class="card-text">
                        <p class="card-title">${eachTask.title}</p>
                        <p class="card-date">Date: ${eachTask.date}</p>
                        </div>
                        <button class="card-button delete-btn">Delete Task</button>`
                    
            content.setAttribute('class',"card");
            content.querySelector('.delete-btn')?.addEventListener('click',()=>{
                deleteTask(eachTask.id);
            })
            section3?.appendChild(content);
            }
        )
    }
}

//button functions
function startTask(taskId: number):void{
    const task = remainingTasks[taskId];
    ongoingTasks.push(task);
    remainingTasks.splice(taskId, 1);
    renderRemainingTasks();
    renderOngoingTasks();
}

function completeTask(taskId: number):void{
    const task = ongoingTasks[taskId];
    completedTasks.push(task);
    ongoingTasks.splice(taskId, 1);
    renderOngoingTasks();
    renderCompletedTasks();
}

function deleteTask(taskId: number):void{
    completedTasks.splice(taskId, 1);
    renderCompletedTasks();
}

//display form
let handleAddTaskJS = document.querySelector('.handleAddTaskJS') as HTMLElement;
handleAddTaskJS?.addEventListener('click', handleAddTaskBtn);
function handleAddTaskBtn():void{
    if(!handleAddTaskJS) return;
    const addSection=document.querySelector('.add-section') as HTMLElement
    if(handleAddTaskJS.innerHTML==='Add Task')
    {
        handleAddTaskJS.innerHTML='Cancel';
        handleAddTaskJS.style.backgroundColor = 'var(--button-background-red)';
        handleAddTaskJS.style.color = 'var(--text-white)';
        addSection.style.display='flex';
        
    }
    else{
        handleAddTaskJS.innerHTML='Add Task';
        handleAddTaskJS.style.backgroundColor = 'var(--button-background)';
        handleAddTaskJS.style.color = 'var(--text-color-dark)'
        addSection.style.display='none';  
    }

}
//add task by handleing form submit
const formElement=document.querySelector(".add-section");
formElement?.addEventListener("submit", (e)=>handleAddTask(e))
function handleAddTask(e:Event):void{
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    form.reset();
    const title = formData.get("title") as string;
    let date = formData.get("date") as string;
    if(!date){
        let today = new Date;
        date = today.toISOString().slice(0, 10);
        console.log(date);
    }
    //validation of inputs using regular expressions
    if(!title){
        alert('Task field cannot be empty');
        return;
    }
    const datePattern = /^\d{4}\-\d{2}\-\d{2}$/;
    if(!datePattern.test(date)){
        alert('The date format must be in yyyy-mm-dd format');
        return;
    }
    const task: Task = {
        title: title,
        date: date
    }
    remainingTasks.push(task);
    renderRemainingTasks();
}


// initially rendering everything to screen
renderRemainingTasks();
renderOngoingTasks();
renderCompletedTasks();