//Global Variables
const form = document.querySelector('#form');
const taskBox = document.querySelector('#task-box');
const container = document.querySelector('.container-tasks');

let tasks = [];




//Event Listener
form.addEventListener('submit', createTask);
document.addEventListener('DOMContentLoaded', () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    createHtml();
});





//Functions
function createTask(e){
    e.preventDefault();
    const task = document.querySelector('#task').value;
    console.log(task);
    let objTask = {
        id: Date.now(),
        task: task,
        status: 'to do'
    }
    tasks.push(objTask);
    console.log(tasks);
    createHtml();
    
    form.reset();
}

function createHtml(){
    cleanHtml();
    if(tasks.length > 0){
        tasks.forEach( (task) => {
            if(task.status == 'Done!'){
                const div = document.createElement('div');
                div.innerHTML = `
                <div class="alert alert-success" role="alert" id="task-box">
                    <b>${task.task}</b>&nbsp;
                    <i>${task.status}</i>
                    <span class="float-right">
                        <i class="fas fa-check" id="change" onclick="update(${task.id}, this)"></i>&nbsp;
                        <i class="fas fa-times" id="remove" onclick="remove(${task.id})"></i>
                    </span>
                    <input type="hidden" value="${task.id}">
                </div>
                `;
                container.appendChild(div);
            }else{
                const div = document.createElement('div');
            div.innerHTML = `
            <div class="alert alert-danger" role="alert" id="task-box">
                <b>${task.task}</b>&nbsp;
                <i>${task.status}</i>
                <span class="float-right">
                    <i class="fas fa-check" id="change" onclick="update(${task.id}, this)"></i>&nbsp;
                    <i class="fas fa-times" id="remove" onclick="remove(${task.id})"></i>
                </span>
                <input type="hidden" value="${task.id}">
            </div>
            `;
            container.appendChild(div);
            }
            
        } );
        
        saveLocalStorage();
    }
    
}

function cleanHtml(){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

function saveLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function update(id, e){
    
    
    
    tasks = JSON.parse( localStorage.getItem('tasks') );
    console.log(tasks);
    tasks.forEach( (item) => {
        if(item.id == id){
            console.log(item.id);
            item.status = 'Done!';
            console.log(item);
            
        }
    } );
    saveLocalStorage();
    console.log(tasks);
    createHtml();
    
}

function remove(id){
    tasks = tasks.filter( (task) => task.id !== id );
    createHtml();
}

