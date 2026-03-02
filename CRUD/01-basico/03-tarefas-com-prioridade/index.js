const taskName = document.getElementById("taskName");
const priority = document.getElementById("priority");
const btnTask = document.getElementById("btnTask");
const resultTasks = document.getElementById("resultTasks");

let taskList = [];
let idCount = 1;
let currentFilter = "all";

function addTask() {
  if (taskName.value === "") {
    alert("Informe qual será a tarefa!");
    return;
  }

  const task = {
    id: idCount,
    title: taskName.value,
    priority: priority.value,
    completed: false,
  };

  taskList.push(task);
  idCount++;

  rendertask();
  taskName.value = "";
  console.log(taskList);
}

function rendertask() {
  let filteredTasks = taskList;

  if (currentFilter === "alta") {
    filteredTasks = taskList.filter((task) => task.priority === "alta");
  } else if (currentFilter === "media") {
    filteredTasks = taskList.filter((task) => task.priority === "media");
  } else if (currentFilter === "baixa") {
    filteredTasks = taskList.filter((task) => task.priority === "baixa");
  } else if (currentFilter === "completed") {
    filteredTasks = taskList.filter((task) => task.completed === true);
  }

  const showTask = filteredTasks.map((task) => {
    return `
      <div class="flex gap-3">
        <p>
          ${task.title} | 
          Prioridade: ${task.priority} |
          Status: ${task.completed ? "✔ Concluída" : "⏳ Pendente"}
        </p>

        <button onclick="toggleCompleted(${task.id})">Concluir</button>
        <button onclick="changePriority(${task.id})">Mudar prioridade</button>
        <button onclick="editTitle(${task.id})">Editar título</button>
        <button onclick="removeTask(${task.id})">Remover</button>
      </div>
    `;
  });

  resultTasks.innerHTML = showTask.join("");
}

function changePriority(id) {
  const task = taskList.find((t) => t.id === id);

  if (!task) return;

  const newPriority = prompt("Nova prioridade:");

  if (newPriority === null || newPriority === "") return;

  task.priority = newPriority;

  rendertask();
}

function editTitle(id) {
  const task = taskList.find((t) => t.id === id);

  if (!task) return;

  const newTitle = prompt("Novo Título:");

  if (newTitle === null || newTitle === "") return;

  task.title = newTitle;

  rendertask();
}

function toggleCompleted(id) {
  const task = taskList.find(t => t.id === id);
  if (!task) return;

  task.completed = !task.completed;
  rendertask();
}

function removeTask(id) {
  taskList = taskList.filter((task) => {
    return task.id !== id;
  });

  rendertask();
}

function setFilter(filter) {
  currentFilter = filter;
  rendertask();
}

btnTask.addEventListener("click", addTask);
