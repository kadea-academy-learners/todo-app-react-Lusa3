import { useState } from 'react'

import './App.css'


// définir le type de tache

interface Task {
  id : string;
  text: string;
  completed : boolean
}
// créer un etat pour gérer la liste des tâches 
const App: React.FC = () => {

const [tasks, setTasks] = useState<Task[]>([]);
const [newTask, setNewTask] = useState<string>("");

// Ajouter une tâche 

const addTask = () => {
  if (!newTask.trim()) return;

  const newTaskObject: Task = {
    id: crypto.randomUUID(), // Utilisation de crypto.randomUUID() pour générer l'UUID
    text: newTask,
    completed: false,
  };

  setTasks([...tasks, newTaskObject]);
  setNewTask("");
};

// marquer une tâche comme terminer 

const toggleComplete = (id: string) => {
  setTasks(
    tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
};
// supprimer une tache 

const deleteTask = (id: string) => {
  setTasks(tasks.filter(task => task.id !== id));
};



const TaskInput = (
  <>
    <input
      type="text"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      placeholder="Entrez une tâche"
    />
    <button onClick={addTask}>Ajouter</button>
  </>
);

const TaskList = (
  <ul>
    {tasks.map(task => (
      <li key={task.id} className="task-list">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <span className={task.completed ? 'completed-task' : 'incomplete-task'}>
          {task.text}
        </span>
        <button onClick={() => deleteTask(task.id)} className="delete-button">
          Supprimer
        </button>
      </li>
    ))}
  </ul>
);

return (
  <div className="container">
    <h1>To do list</h1>
    {TaskInput} 
    {TaskList} 
  </div>
);
};


export default App
