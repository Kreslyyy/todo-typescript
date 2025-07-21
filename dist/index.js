var taskList = document.querySelector('.task_list');
var statusTask = document.querySelector('.statusTask');
var input = document.getElementById('inputTask');
var addTask = document.getElementById('addTask');
function createTask(text) {
    var li = document.createElement('li');
    li.className = 'task_list-item';
    var taskDiv = document.createElement('div');
    taskDiv.className = 'task_description';
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'statusTask';
    var span = document.createElement('span');
    span.textContent = text;
    checkbox.addEventListener("change", function () {
        span.classList.toggle("done", checkbox.checked);
    });
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(span);
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteTask delete btn';
    deleteBtn.textContent = 'Удалить';
    deleteBtn.onclick = function () { return li.remove(); };
    li.appendChild(taskDiv);
    li.appendChild(deleteBtn);
    return li;
}
addTask.addEventListener('click', function () {
    var value = input.value;
    if (value.trim() === '')
        return;
    var newTask = createTask(value);
    taskList.appendChild(newTask);
    input.value = '';
});
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask.click();
    }
});
