import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useAllTask = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/tasks?email=${user.email}`)
                .then(res => res.json())
                .then(data => setTasks(data))
        }
    }, [user])
    return tasks
};

export default useAllTask;