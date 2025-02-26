import { NavLink } from "react-router-dom";
import SocialLogin from "../components/SocialLogin/SocialLogin";

const Register = () => {
    
    return (
        <div className="font-bold flex items-center justify-center h-screen">

            <div className="card bg-[#EBE5C2] w-full max-w-sm shrink-0 ">
                <div className="card-body">
                    <h1 className="mx-auto py-3 text-2xl text-center">Register Now to get all the facilities</h1>
                    <form className="fieldset">
                        <label className="fieldset-label">Name</label>
                        <input name="name" type="text" className="input" placeholder="Name" />
                        <label className="fieldset-label">Email</label>
                        <input name="email" type="email" className="input" placeholder="Email" />
                        <label className="fieldset-label">Password</label>
                        <input name="password" type="password" className="input" placeholder="Password" />
                        <button className={'w-full mt-4'} >Register {<span className="loading loading-spinner loading-xs"></span>}</button>
                        <p className="mt-3">You have account <NavLink to={'/login'} className={'link'}>Login</NavLink></p>
                    </form>
                    <SocialLogin/>
                </div>
            </div>
        </div>
    );
};

export default Register;