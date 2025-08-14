import React, { useState } from 'react'
import { useContext } from 'react';
import TasksContext from '../context/task';

const TaskCreate = ({ task, taskFormUpdate, onUpdate }) => {

    const {editTaskById,createTask} = useContext(TasksContext);

    const [title, setTitle] = useState(task ? task.title : '');
    const [taskDesc, setTaskDesc] = useState(task ? task.taskDesc : '');

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTaskChange = (event) => {
        setTaskDesc(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(taskFormUpdate) {
            onUpdate(task.id,title,taskDesc);
        }
        else{
            createTask(title,taskDesc);
        }
        setTitle('');
        setTaskDesc('');
    };

    return (

        <div>
            {taskFormUpdate ? (
                <div className='task-update'>
                    <h3>Please edit task.</h3>
                    <form className='task-form'>    
                        <label className='task-label'>Title</label>
                        <input value={title} onChange={handleChange} className='task-input' />
                        <label className='task-label'>Task Details</label>
                        <textarea value={taskDesc} onChange={handleTaskChange} className='task-input' rows={5}></textarea>
                        <button className='task-button update-button' onClick={handleSubmit}>Update</button>
                    </form>
                </div>
            ) : (
                <div className='task-create'>
                    <h3>Please enter a task.</h3>
                    <form className='task-form'>
                        <label className='task-label'>Title</label>
                        <input value={title} onChange={handleChange} className='task-input' />
                        <label className='task-label'>Task Details</label>
                        <textarea value={taskDesc} onChange={handleTaskChange} className='task-input' rows={5}></textarea>
                        <button className='task-button' onClick={handleSubmit}>Create</button>
                    </form>
                </div>)}

        </div>
    )
}

export default TaskCreate