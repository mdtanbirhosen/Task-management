import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from 'prop-types';
const TaskItem = ({ task,  }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useDraggable({ id: task._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: '100%',
        height: isDragging ? '60px' : '50px',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? '#f3f4f6' : 'white',
        boxShadow: isDragging ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners} 
            className="  flex items-center justify-between max-h-20"
            
        >
            <h2>{task.title}</h2> 
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
};

export default TaskItem;
