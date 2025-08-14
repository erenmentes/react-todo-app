import React, { useState } from 'react'
import TaskCreate from './TaskCreate';
import { useContext } from 'react';
import TasksContext from '../context/task';

const TaskShow = ({ task }) => {

    const {editTaskById,deleteTaskById} = useContext(TasksContext);

    const [showUpdate, setShowUpdate] = useState(false)

    const handleDeleteClick = () => {
        deleteTaskById(task.id);
    };

    const handleUpdateClick = () => {
        setShowUpdate(!showUpdate);
    };

    const handleSubmit = (id,newTitle,newTaskDesc) => {
        setShowUpdate(!showUpdate);

        editTaskById(id,newTitle,newTaskDesc);
    };

    return (
        <div className='task-show'>
            {
                showUpdate ? (
                    <TaskCreate task={task} taskFormUpdate={true} onUpdate={handleSubmit}/>
                ) : (
                <div>
                    <h3 className='task-title'>Task</h3>
                    <p>{task.title}</p>
                    <h3 className='task-title'>Task Details</h3>
                    <p>{task.taskDesc}</p>
                    <div>
                        <button className='task-delete' onClick={handleDeleteClick}>Delete</button>
                        <button className='update-button' onClick={handleUpdateClick}>Update</button>
                    </div>
                </div>)
            }
        </div>
    )
}

export default TaskShow