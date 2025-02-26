import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TaskBoard from "./homeComponents/TaskBoard";
import useAllTask from "../../hooks/useAllTask";
import Navbar from "../../components/Navbar/Navbar";
import NoTasks from "./homeComponents/NoTasks";

const Home = () => {
    const {  user, authLoading } = useAuth();
    const {tasks} = useAllTask();
    console.log(tasks)
        if (authLoading) {
            console.log('loading...')
            return <div>Loading...</div>
        }
        if (!user) {
            console.log('not logged in');
            return <Navigate to={'/login'} />
        }



    return (
        <div className="relative">
            <Navbar></Navbar>
            <main className="pt-20">
            {
                tasks.length ? <TaskBoard></TaskBoard>:<NoTasks></NoTasks>
            }
            </main>
            
        </div>
    );
};

export default Home;