import { FaPlus } from "react-icons/fa"
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAllTask from "../../../hooks/useAllTask";
const NoTasks = () => {
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
            <div className="p-7  flex justify-center items-center bg-amber-100 rounded-full">
                <div  onClick={() => document.getElementById('my_modal_1').showModal()}  className="px-4 hover:bg-blue-200 cursor-pointer py-4 rounded-full  bg-white "><FaPlus className="text-3xl"></FaPlus></div>
            </div>

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

export default NoTasks;