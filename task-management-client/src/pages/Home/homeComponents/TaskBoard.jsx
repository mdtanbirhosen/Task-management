import { DndContext, closestCenter } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import TaskColumn from './TaskColumn';
import useAllTask from '../../../hooks/useAllTask';
import AddTask from './AddTask';
import axios from 'axios';

const categories = ['To-Do', 'In Progress', 'Done'];

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const {tasks:allTasks, refetch} = useAllTask()
    useEffect(() => {
        setTasks(allTasks);
    }, [allTasks]);

    const [movedTask, setMovedTask] = useState(null);

    useEffect(() => {
        if (movedTask) {
            console.log(`Task "${movedTask.title}" moved to "${movedTask.category}"`);
            fetch('https://task-management-server-six-mu.vercel.app/tasks',{
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: movedTask._id,
                    category: movedTask.category,
                }),
            })
            .then(response => console.log(response));
        }
    }, [movedTask]);

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeTask = tasks.find((task) => task._id === active.id);
        if (!activeTask) return;

        const newCategory = over.id;
        if (activeTask.category !== newCategory) {
            const updatedTasks = tasks.map((task) =>
                task._id === active.id ? { ...task, category: newCategory } : task
            );
            setTasks(updatedTasks);

            setMovedTask({ ...activeTask, category: newCategory });
        }
    };

    const handleDelete = (id)=>{
        axios.delete(`https://task-management-server-six-mu.vercel.app/tasks/${id}`)
        .then(response => {
            console.log(response.data)
            refetch()
        })
    }

    return (
        <div className='p-4'>
           <div className='flex justify-end mb-5'>
            
         <AddTask></AddTask>
           </div>
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <div className="grid grid-cols-3 gap-4 ">
                    {categories.map((category) => (
                        <TaskColumn
                            key={category} 
                            category={category} 
                            tasks={tasks.filter((task) => task.category === category)} 
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default TaskBoard;
