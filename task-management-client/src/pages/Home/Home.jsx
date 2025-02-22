import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from 'prop-types';
import { useState } from 'react';

const TaskItem = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-4 border rounded shadow m-2 bg-white">
            {task.title}
        </div>
    );
};

const Home = () => {
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Task 1', category: 'To-Do' },
        { id: '2', title: 'Task 2', category: 'In Progress' },
        { id: '3', title: 'Task 3', category: 'Done' },
    ]);

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = tasks.findIndex(t => t.id === active.id);
        const newIndex = tasks.findIndex(t => t.id === over.id);
        const newTasks = [...tasks];
        const [movedTask] = newTasks.splice(oldIndex, 1);
        newTasks.splice(newIndex, 0, movedTask);
        setTasks(newTasks);
    };

    return (
<div>
<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </SortableContext>
        </DndContext>
</div>
    );
};


TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
}

export default Home;