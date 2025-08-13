import './App.css';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [tasks, setTasks] = useState([]);

  const createTask = async (title,taskDesc) => {

    const response = await axios.post('http://localhost:3001/tasks',{
      title,
      taskDesc
    });

    console.log(response);

    const createdTasks = [
      ...tasks,
        response.data
    ];

    setTasks(createdTasks);
  };

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3001/tasks');
    setTasks(response.data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTaskById = async (id) => {
    const response = await axios.delete(`http://localhost:3001/tasks/${id}`);
    const afterDeleteTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeleteTasks);
  };

  const editTaskById = async (id,newTitle,newTaskDesc) => {
    const response = await axios.put(`http://localhost:3001/tasks/${id}`,{
      title : newTitle,
      taskDesc : newTaskDesc
    });
    const updatedTasks = tasks.map((task) => {
      if(task.id === id){
        return {id,title:newTitle,taskDesc:newTaskDesc};
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <TaskCreate onCreate={createTask}/>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} onDelete={deleteTaskById} onUpdate={editTaskById}/>
    </div>
  );
}

export default App;
