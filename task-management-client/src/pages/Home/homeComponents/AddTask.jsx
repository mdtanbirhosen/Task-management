import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAllTask from "../../../hooks/useAllTask";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {user} = useAuth();
    const {refetch} = useAllTask();

    const handleAddTask = () => {
        const newTask = {
            title,
            description,
            category: "To-Do",
            email: user.email,
        }
        fetch('http://localhost:5000/tasks',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
        .then((response)=>{
            console.log(response.data);
            refetch();
        })
        setTitle(""); 
        setDescription(""); 
        document.getElementById('my_modal_1').close(); 
    };

    return (
        <div>
            {/* Open Modal Button */}
            <button 
                onClick={() => document.getElementById('my_modal_1').showModal()} 
                className='px-5 py-3 bg-[#EBE5C2] flex items-center gap-1 rounded-md font-medium'
            >
                Add New Task <span className='text-3xl'>+</span>
            </button>

            {/* Add Task Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Task</h3>
                    
                    {/* Input Fields */}
                    <div className="py-4">
                        <input 
                            type="text" 
                            placeholder="Title" 
                            className="input input-bordered w-full mb-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea 
                            placeholder="Description" 
                            className="textarea textarea-bordered w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Modal Actions */}
                    <div className="modal-action">
                        <button onClick={handleAddTask} className="btn btn-primary">Add Task</button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AddTask;
