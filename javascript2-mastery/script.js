const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter');

let tasks = [];

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed)
    ) {
      const li = document.createElement('li');
      li.classList.add(task.completed ? 'completed' : 'pending');

      const status = task.completed ? "[Completed ✅]" : "[Pending ⏳]";

      li.innerHTML = `
        <span class="task-text">${task.text} <small>${status}</small></span>
        <div>
          <button onclick="toggleComplete(${index})">${task.completed ? '↩️' : '✅'}</button>
          <button onclick="editTask(${index})">🖊️</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      `;
      taskList.appendChild(li);
    }
  });
}

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  renderTasks(getActiveFilter());
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks(getActiveFilter());
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(getActiveFilter());
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText && newText.trim()) {
    tasks[index].text = newText.trim();
    renderTasks(getActiveFilter());
  }
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks(btn.getAttribute("data-filter"));
  });
});

function getActiveFilter() {
  const activeBtn = document.querySelector('.filter.active');
  return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
}

renderTasks();
