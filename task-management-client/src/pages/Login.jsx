import { NavLink, useNavigate } from "react-router-dom";
import SocialLogin from "../components/SocialLogin/SocialLogin";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const {authLoading,loginUser} = useAuth();
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
        .then(res => {
            navigate('/');
            console.log(res)
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="font-bold flex items-center justify-center h-screen">

            <div className="card bg-[#EBE5C2] w-full max-w-sm shrink-0 ">
                <div className="card-body">
                <h1 className="mx-auto py-3 text-2xl">Login To Get All The Facilities</h1>
                    <form onSubmit={handleLogin} className="fieldset">
                        <label className="fieldset-label">Email</label>
                        <input name="email" type="email" className="input" placeholder="Email" />
                        <label className="fieldset-label">Password</label>
                        <input name="password" type="password" className="input" placeholder="Password" />
                        <button className={'w-full mt-4 bg-white py-2 px-5 rounded-sm'}>Login {authLoading && <span className="loading loading-spinner loading-xs"></span>}</button>
                        <SocialLogin></SocialLogin>
                        <p className="mt-3">You have&apos;nt account <NavLink to={'/register'} className={'link'}>Register</NavLink></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;