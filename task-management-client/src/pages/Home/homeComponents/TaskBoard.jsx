import { DndContext, closestCenter } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import TaskColumn from './TaskColumn';

const categories = ['To-Do', 'In Progress', 'Done'];

const TaskBoard = () => {
    const { logOut, user, authLoading } = useAuth();
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Task 1', category: 'To-Do' },
        { id: '2', title: 'Task 2', category: 'In Progress' },
        { id: '3', title: 'Task 3', category: 'Done' },
    ]);

    const [movedTask, setMovedTask] = useState(null);

    useEffect(() => {
        if (movedTask) {
            console.log(`Task "${movedTask.title}" moved to "${movedTask.category}"`);
        }
    }, [movedTask]);

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeTask = tasks.find((task) => task.id === active.id);
        if (!activeTask) return;

        const newCategory = over.id;
        if (activeTask.category !== newCategory) {
            const updatedTasks = tasks.map((task) =>
                task.id === active.id ? { ...task, category: newCategory } : task
            );
            setTasks(updatedTasks);

            setMovedTask({ ...activeTask, category: newCategory });
        }
    };

    const handleLogOut = () => {
        logOut().then(() => {
            console.log('logged out');
        });
    };

    if (authLoading) {
        console.log('loading...');
        return <div>Loading...</div>;
    }
    if (!user) {
        console.log('not logged in');
        return <Navigate to={'/login'} />;
    }

    return (
        <div>
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <div className="grid grid-cols-3 gap-4 p-4">
                    {categories.map((category) => (
                        <TaskColumn
                            key={category} 
                            category={category} 
                            tasks={tasks.filter((task) => task.category === category)} 
                        />
                    ))}
                </div>
            </DndContext>
            <button onClick={handleLogOut}>Logout</button>
        </div>
    );
};

export default TaskBoard;