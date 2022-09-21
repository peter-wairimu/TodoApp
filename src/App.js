import './App.css';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, {useState} from 'react';
import { nanoid} from "nanoid"


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed

};

function App(props) {

const [tasks, setTasks] = useState(props.tasks); 
const [filter, setFilter] = useState("All")


 
function addTask(name) {
    const newTask = {id: `todo-${nanoid}`, name, completed: false};
    setTasks([...tasks, newTask])
  }

  const FILTER_NAMES = 
  Object.keys(FILTER_MAP);

const editTask = (id, newName) => {
  const editedTaskList = tasks.map((task) => {
    if (id === task.id){
      return {...task, name: newName}
    }
    return task;

  })
  setTasks(editedTaskList);

}


const toggleTaskCompleted = (id) => {
  const updatedTasks = tasks.map((task) => {
    if (id === task.id){
      return {...task, completed: !task.completed}
    }
    return task;
  });
  setTasks(updatedTasks);

}

const deleteTask = (id) => {
  const remainingTasks = tasks.filter((task) => id !== task.id);
  setTasks(remainingTasks)

}


const taskList = tasks.map((task) => (
  <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask = {deleteTask}
      editTask = {editTask}
  />
));



const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';

const headingText = `${taskList.length} ${tasksNoun} remaining`

const filterList = FILTER_NAMES.map((name) => (
  <FilterButton 
  key={name} 
  name={name}
  isPressed={name === filter}
  setFilter={setFilter}

  />
))


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>

      <div className="filters btn-group stack-exception">
        {filterList}


      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}

       
      </ul>
    </div>
  );
}

export default App;
