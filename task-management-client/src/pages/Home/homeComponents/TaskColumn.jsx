import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';

const TaskColumn = ({ category, tasks }) => {
    const { setNodeRef } = useDroppable({ id: category });
    
    return (
        <div ref={setNodeRef} className="p-4 border rounded shadow bg-[] min-h-[300px] flex flex-col">
            <h2 className="text-lg font-bold mb-2 text-center">{category}</h2>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <TaskItem key={task._id} task={task} />
                ))}
            </SortableContext>
        </div>
    );
};

TaskColumn.propTypes = {
    category: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
};

export default TaskColumn;
