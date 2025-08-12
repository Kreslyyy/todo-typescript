"use strict";
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const span = li.querySelector('span');
        const checkbox = li.querySelector('input[type=checkbox]');
        tasks.push({ text: span.textContent || '', done: checkbox.checked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        const tasks = JSON.parse(saved);
        tasks.forEach(task => {
            var _a;
            const li = createTask(task.text);
            const checkbox = li.querySelector('input[type=checkbox]');
            checkbox.checked = task.done;
            if (task.done) {
                (_a = li.querySelector('span')) === null || _a === void 0 ? void 0 : _a.classList.add('done');
            }
            taskList.appendChild(li);
        });
    }
}
const taskList = document.querySelector('.task_list');
const statusTask = document.querySelector('.statusTask');
const input = document.getElementById('inputTask');
const addTask = document.getElementById('addTask');
function createTask(text) {
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
    deleteBtn.addEventListener('click', () => {
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
    if (value.trim() === '')
        return;
    const newTask = createTask(value);
    taskList.appendChild(newTask);
    input.value = '';
    saveTasks();
});
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask.click();
    }
});
