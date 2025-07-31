let tasks = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    input.value = "";
    renderTasks();
  }
}

function renderTasks(filter = "all") {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? "completed" : "pending"}`;
    li.innerHTML = `
      ${task.text}
      <div>
        <button class="btn btn-sm btn-outline-success me-2" onclick="markCompleted(${index})">Complete</button>
        <button class="btn btn-sm btn-outline-secondary" onclick="markPending(${index})">Pending</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function markCompleted(index) {
  tasks[index].completed = true;
  renderTasks();
}

function markPending(index) {
  tasks[index].completed = false;
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}
