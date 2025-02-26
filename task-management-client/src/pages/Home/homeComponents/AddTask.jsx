import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAllTask from "../../../hooks/useAllTask";
import axios from "axios";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("To-Do");
    const { user } = useAuth();
    const { refetch } = useAllTask();
    
    const handleAddTask = async () => {
        if (!title.trim()) {
            alert("Title is required!");
            return;
        }
        if (title.length > 50) {
            alert("Title cannot exceed 50 characters!");
            return;
        }
        if (description.length > 200) {
            alert("Description cannot exceed 200 characters!");
            return;
        }

        const newTask = {
            title,
            description,
            category,
            email: user.email,
            timestamp: new Date().toISOString(), // Auto-generated timestamp
        };

        try {
            const response = await axios.post("http://localhost:5000/tasks", newTask);
            console.log(response.data);
            refetch(); // Refresh task list
        } catch (error) {
            console.error("Error adding task:", error);
        }

        // Reset input fields
        setTitle(""); 
        setDescription("");
        setCategory("To-Do");
        document.getElementById("my_modal_1").close();
    };

    return (
        <div>
            {/* Open Modal Button */}
            <button 
                onClick={() => document.getElementById("my_modal_1").showModal()} 
                className="px-5 py-3 bg-[#EBE5C2] flex items-center gap-1 rounded-md font-medium"
            >
                Add New Task <span className="text-3xl">+</span>
            </button>

            {/* Add Task Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Task</h3>
                    
                    {/* Input Fields */}
                    <div className="py-4">
                        {/* Title Input */}
                        <input 
                            type="text" 
                            placeholder="Title (max 50 characters)" 
                            className="input input-bordered w-full mb-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* Description Input */}
                        <textarea 
                            placeholder="Description (optional, max 200 characters)" 
                            className="textarea textarea-bordered w-full mb-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {/* Category Dropdown */}
                        <select 
                            className="select select-bordered w-full mb-2"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
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
