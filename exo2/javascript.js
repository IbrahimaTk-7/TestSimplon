// Sélectionnez les éléments HTML
const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const taskDeadlineInput = document.getElementById("task-deadline");
const taskPrioritySelect = document.getElementById("task-priority");

const taskList = document.getElementById("task-ul");

// Tableau pour stocker les tâches
const tasks = [];


// Fonction pour ajouter une nouvelle tâche
function addTask() {
    
    const title = taskTitleInput.value;
    const description = taskDescriptionInput.value;
    const deadline = taskDeadlineInput.value;
    const priority = taskPrioritySelect.value;

    // Vérifiez que tous les champs sont remplis
    if (title !== "" && description !== "" && deadline !== "" && priority !== "") {
        const task = { title, description, deadline, priority, completed: false };
        tasks.push(task);
        updateTaskList(); // Mettez à jour la liste des tâches après l'ajout
        clearInputs(); // Effacez les champs de saisie
        alert('La tâche a bien été ajoutée!!!');
    } else {
        alert('Veuillez remplir tous les champs avant de créer une tâche.');
    }
}


// Fonction pour mettre à jour la liste des tâches
function updateTaskList() {
    tasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);

    for (const task of tasks) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <strong>${task.title}</strong>
            <p>${task.description}</p>
            <p>Deadline: ${task.deadline}</p>
            <p>Priorité: ${task.priority}</p>
            <button onclick="completeTask(${tasks.indexOf(task)})">Terminer</button>
            <button onclick="editTask(${tasks.indexOf(task)})">Modifier</button>
        `;
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        taskList.appendChild(taskItem);
    }
}

// Fonction pour marquer une tâche comme terminée
function completeTask(index) {
    tasks[index].completed = true;
    updateTaskList();
}

// Fonction pour éditer une tâche
function editTask(index) {
    const newTitle = prompt("Nouveau titre de la tâche :");
    if (newTitle) {
        tasks[index].title = newTitle;
        updateTaskList();
    }
}

// Fonction pour afficher la liste des tâches dans une alerte
function afficherListeTaches() {
    if (tasks.length === 0) {
        alert("La liste des tâches est vide.");
        return;
    }

    let listeTachesTexte = "Liste des tâches :\n";
    for (const task of tasks) {
        listeTachesTexte += `- ${task.title}\n`;
    }

    alert(listeTachesTexte);
}

// Fonction pour effacer les champs de saisie
function clearInputs() {
    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    taskDeadlineInput.value = "";
    taskPrioritySelect.value = "faible";
}

// Ajouter un gestionnaire d'événements pour le bouton "Ajouter une tâche"
addTaskButton.addEventListener("click", addTask);

// Mettre à jour la liste des tâches initiale
updateTaskList();
