import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useAllTask = () => {
    const { user } = useAuth();

    const { data: tasks = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["tasks", user?.email], // Unique query key
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axios.get(`https://task-management-server-six-mu.vercel.app/tasks?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Prevents running if user is not available
    });

    return { tasks, isLoading, isError, refetch };
};

export default useAllTask;
