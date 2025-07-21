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
    });


    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteTask delete btn';
    deleteBtn.textContent = 'Удалить';
    deleteBtn.onclick = () => li.remove();

    li.appendChild(taskDiv);
    li.appendChild(deleteBtn);

    return li;
}

addTask.addEventListener('click', () => {
    const value = input.value;
    if (value.trim() === '') return;
    const newTask = createTask(value);
    taskList.appendChild(newTask);
    input.value = '';
})  
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask.click();
    }
});
