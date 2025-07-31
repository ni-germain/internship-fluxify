let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  updateProgress();
}

function addTask() {
  const name = document.getElementById('taskInput').value.trim();
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;
  const tags = document.getElementById('tags').value.trim();

  if (!name) return;

  const task = {
    id: Date.now(),
    name,
    dueDate,
    priority,
    tags: tags.split(' ').filter(t => t.startsWith('#')),
    completed: false,
    subtasks: [],
    timeSpent: 0
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  document.getElementById('taskInput').value = '';
  document.getElementById('tags').value = '';
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function filterTasks(status) {
  renderTasks(status);
}

function searchTasks() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  renderTasks(null, query);
}

function renderTasks(status = 'all', query = '') {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks
    .filter(t => {
      if (status === 'completed') return t.completed;
      if (status === 'pending') return !t.completed;
      return true;
    })
    .filter(t => t.name.toLowerCase().includes(query) || t.tags.join(' ').toLowerCase().includes(query))
    .forEach(task => {
      const li = document.createElement('li');
      li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : 'pending'} ${task.priority}`;

      const content = document.createElement('div');
      content.innerHTML = `
        <div><strong>${task.name}</strong> (${task.dueDate || 'No due date'})</div>
        <small>${task.tags.join(' ')}</small>
      `;

      const controls = document.createElement('div');
      controls.innerHTML = `
        <button class="btn btn-sm btn-${task.completed ? 'warning' : 'success'} me-2" onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Done'}</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
      `;

      li.appendChild(content);
      li.appendChild(controls);
      list.appendChild(li);
    });

  updateProgress();
}

function updateProgress() {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const bar = document.getElementById('progressBar');
  bar.style.width = `${percent}%`;
  bar.textContent = `${percent}%`;
}

function exportTasks() {
  const data = JSON.stringify(tasks);
  const blob = new Blob([data], { type: "application/json" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "tasks.json";
  a.click();
}

function importTasks() {
  const fileInput = document.getElementById('importFile');
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    tasks = JSON.parse(e.target.result);
    saveTasks();
    renderTasks();
  };
  reader.readAsText(file);
}

// Optional: keyboard shortcut (Enter to add)
document.getElementById('taskInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();
