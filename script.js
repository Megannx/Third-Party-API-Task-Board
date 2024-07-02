// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1 ;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `task_${timestamp}_${randomNumber}`;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = task.title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = task.description;

    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDescription);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const taskListContainer = document.getElementById('task-list');
    if (!taskListContainer) {
        console.error('Task list container not found');
        return;
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const taskTitle = $('#taskName').val();
    const taskDescription = $('#taskDescription').val();

    let status = 'To Do';
    if (taskDescription.toLowerCase().includes('to do')) {
        status = 'To Do';
    } else if (taskDescription.toLowerCase().includes('in progress')) {
        status = 'In Progress';
    } else if (taskDescription.toLowerCase().includes('done')) {
        status = 'Done';
    }

    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        description: taskDescription,
        status: status 
    };

    taskList.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(taskList));

    const newTaskCard = createTaskCard(newTask);
    
    const taskListContainer = document.getElementById('task-list');
    taskListContainer.appendChild(newTaskCard);

    if (status === 'To Do') {
        const toDoBox = $('#to-do-column');
        toDoBox.append(newTaskCard);
    } else if (status === 'In Progress') {
        const inProgressBox = $('#in-progress-column');
        inProgressBox.append(newTaskCard);
    } else if (status === 'Done') {
        const doneBox = $('#done-column');
        doneBox.append(newTaskCard);
    }

    $('#taskName').val('');
    $('#taskDescription').val('');

    renderTaskList(); 
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(taskId) {
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const droppedTask = taskList.find(task => task.id === taskId);

    let newStatus;
    if (event.target.id === 'to-do-column') {
        newStatus = 'To Do';
    } else if (event.target.id === 'in-progress-column') {
        newStatus = 'In Progress';
    } else if (event.target.id === 'done-column') {
        newStatus = 'Done';
    }

    droppedTask.status = newStatus;

    localStorage.setItem('tasks', JSON.stringify(taskList));

    rendertaskList();
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function() {
    renderTaskList();

    const statusLanes = document.querySelectorAll('.status-lane');
    statusLanes.forEach(lane => {
        lane.addEventListener('dragover', event => event.preventDefault());
        lane.addEventListener('drop', handleDrop);
    });

    $('#saveTaskButton').on('click', function(event) {
        event.preventDefault();
        handleAddTask(event);
    });
});

// Corrected function call in handleDrop function
function handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const droppedTask = taskList.find(task => task.id === taskId);

    let newStatus;
    if (event.target.id === 'to-do-column') {
        newStatus = 'To Do';
    } else if (event.target.id === 'in-progress-column') {
        newStatus = 'In Progress';
    } else if (event.target.id === 'done-column') {
        newStatus = 'Done';
    }

    droppedTask.status = newStatus;

    localStorage.setItem('tasks', JSON.stringify(taskList));

    renderTaskList();
}