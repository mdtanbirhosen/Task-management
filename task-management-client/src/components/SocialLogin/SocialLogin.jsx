import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const navigate = useNavigate()
    const handleGoogleBtn = ()=>{
        googleSignIn()
        .then(result => {
            console.log(result);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <div onClick={handleGoogleBtn} className="flex text-center  px-5 py-2 bg-white  rounded-sm items-center justify-center gap-1  mt-2"><FcGoogle/> <span>Google</span></div>
        </div>
    );
};

export default SocialLogin;