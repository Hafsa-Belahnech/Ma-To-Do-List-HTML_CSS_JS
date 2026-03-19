// script.js

// Récupérer les éléments
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Charger les tâches depuis le localStorage au démarrage
loadTasks();

// Ajouter une tâche quand on clique sur le bouton
addBtn.addEventListener('click', addTask);

// Ajouter une tâche avec la touche Entrée
taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Veuillez entrer une tâche !');
    return;
  }

  // Créer un nouvel élément de liste
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <button>Supprimer</button>
  `;

  // Clic sur le texte → marquer comme terminé
  li.querySelector('span').addEventListener('click', function() {
    li.classList.toggle('completed');
    saveTasks(); // Sauvegarder l'état
  });

  // Clic sur "Supprimer"
  li.querySelector('button').addEventListener('click', function() {
    li.remove();
    saveTasks(); // Mettre à jour le stockage
  });

  // Ajouter à la liste
  taskList.appendChild(li);

  // Vider le champ
  taskInput.value = '';
  taskInput.focus();

  // Sauvegarder
  saveTasks();
}

// Sauvegarder les tâches dans le navigateur
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const completed = li.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Charger les tâches depuis le navigateur
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');
    li.innerHTML = `
      <span>${task.text}</span>
      <button>Supprimer</button>
    `;
    li.querySelector('span').addEventListener('click', function() {
      li.classList.toggle('completed');
      saveTasks();
    });
    li.querySelector('button').addEventListener('click', function() {
      li.remove();
      saveTasks();
    });
    taskList.appendChild(li);
  });
}