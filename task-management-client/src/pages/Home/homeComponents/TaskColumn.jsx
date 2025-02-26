import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';
import { RiDeleteBin6Line } from 'react-icons/ri';

const TaskColumn = ({ category, tasks, handleDelete }) => {
    const { setNodeRef } = useDroppable({ id: category });

    return (
        <div ref={setNodeRef} className="p-4 border rounded shadow bg-[] min-h-[300px] flex flex-col">
            <h2 className="text-lg font-bold mb-2 text-center">{category}</h2>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <div key={task._id} className="px-5 border rounded shadow m-2 cursor-pointer flex items-center justify-between max-h-20"><TaskItem task={task} handleDelete={handleDelete} />
                        <button onClick={() => handleDelete(task._id)} className='p-1 rounded-sm hover:bg-red-500 hover:text-white'><RiDeleteBin6Line /></button></div>
                ))}
            </SortableContext>
        </div>
    );
};

TaskColumn.propTypes = {
    category: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    handleDelete: PropTypes.func,
};

export default TaskColumn;
