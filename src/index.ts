interface Task {
    text: string;
    done: boolean;
}

function saveTasks(){
    const tasks:Task[]=[];
    taskList.querySelectorAll('li').forEach(li => {
        const span = li.querySelector('span') as HTMLSpanElement;
        const checkbox = li.querySelector('input[type=checkbox]') as HTMLInputElement;
        tasks.push({text: span.textContent||'', done:checkbox.checked});
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const saved = localStorage.getItem('tasks');
    if(saved){
        const tasks:Task[]=JSON.parse(saved);
        tasks.forEach(task=>{
            const li = createTask(task.text);
            const checkbox = li.querySelector('input[type=checkbox]') as HTMLInputElement;
            checkbox.checked = task.done;
            if(task.done){
                li.querySelector('span')?.classList.add('done');
            }
            taskList.appendChild(li);
        })
    }
}

const taskList = document.querySelector('.task_list') as HTMLUListElement;
const statusTask = document.querySelector('.statusTask') as HTMLInputElement;
const input = document.getElementById('inputTask') as HTMLInputElement;
const addTask = document.getElementById('addTask') as HTMLButtonElement;

function createTask(text: string): HTMLLIElement {
    const li = document.createElement('li');
    li.className = 'task_list-item';

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task_description';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'statusTask';  

    const span = document.createElement('span');
    span.textContent = text;

    checkbox.addEventListener("change", () => {
        span.classList.toggle("done", checkbox.checked);
        saveTasks();
    });


    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteTask delete btn';
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', ()=>{
        li.remove();
        saveTasks();
    });

    li.appendChild(taskDiv);
    li.appendChild(deleteBtn);

    return li;
}

loadTasks();

addTask.addEventListener('click', () => {
    const value = input.value;
    if (value.trim() === '') return;
    const newTask = createTask(value);
    taskList.appendChild(newTask);
    input.value = '';
    saveTasks();
})  
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask.click();
    }
});