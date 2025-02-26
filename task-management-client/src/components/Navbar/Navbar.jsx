import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/logo.png"
import { CiUser } from "react-icons/ci";
import useAuth from "../../hooks/useAuth";
const Navbar = () => {
    const {user} = useAuth();
    const { logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut().then(() => {
            console.log('logged out');
        });
    };
    return (
        <div className="bg-[#EBE5C2] fixed w-full ">
            <div className="navbar shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl"><img src={logo} className="h-10 w-full" alt="" /></a>
                </div>
                <div className="flex items-center gap-2">
                    <h4 className="font-medium">{user?.displayName || user?.email}</h4>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar bg-white">

                            <CiUser className="text-3xl" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Home</a></li>
                            <li>
                                <a className="justify-between">
                                    Profile
                                </a>
                            </li>
                            <li onClick={handleLogOut} ><a>LogOut</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;