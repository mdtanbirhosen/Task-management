import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from 'prop-types';
import { useState } from 'react';
// import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const categories = ['To-Do', 'In Progress', 'Done'];

const TaskItem = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useDraggable({ id: task.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: '100%',
        height: '50px', // Fixed height to prevent resizing
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? '#f3f4f6' : 'white',
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners} 
            className="p-4 border rounded shadow m-2 cursor-pointer flex items-center justify-center"
        >
            {task.title}
        </div>
    );
};

const Column = ({ category, tasks }) => {
    const { setNodeRef } = useDroppable({ id: category });
    
    return (
        <div ref={setNodeRef} className="p-4 border rounded shadow bg-gray-100 min-h-[300px] flex flex-col">
            <h2 className="text-lg font-bold mb-2 text-center">{category}</h2>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </SortableContext>
        </div>
    );
};


const Home = () => {
    const {logOut, user, authLoading} = useAuth()
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Task 1', category: 'To-Do' },
        { id: '2', title: 'Task 2', category: 'In Progress' },
        { id: '3', title: 'Task 3', category: 'Done' },
    ]);

    const [movedTask, setMovedTask] = useState(null); // Observer variable

    useEffect(() => {
        if (movedTask) {
            console.log(`Task "${movedTask.title}" moved to "${movedTask.category}"`);
        }
    }, [movedTask]); // Logs whenever movedTask updates

    const onDragEnd = async (event) => {
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

            const moved = { ...activeTask, category: newCategory };
            setMovedTask(moved);

            // await updateTaskInDB(active.id, newCategory);
        }
    };

    //  handle log out 
    const handleLogOut = ()=>{
        logOut()
        .then(()=>{
            console.log('logged out')
        })
    }


    // condition to login user
    if(authLoading) return <div>Loading...</div>
    if(!user) return <Navigate to={'/login'}></Navigate>

    return (
        <div>
            
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <div className="grid grid-cols-3 gap-4 p-4">
                {categories.map((category) => (
                    <Column 
                        key={category} 
                        category={category} 
                        tasks={tasks.filter((task) => task.category === category)} 
                    />
                ))}
                
            </div>
        </DndContext>
        <button onClick={()=> handleLogOut()}>hello</button>
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
};

Column.propTypes = {
    category: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    setTasks: PropTypes.func.isRequired,
};

export default Home;
