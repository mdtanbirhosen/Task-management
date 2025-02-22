import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const handleGoogleBtn = ()=>{
        googleSignIn()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <div onClick={handleGoogleBtn} className="flex "><FcGoogle/> <span>Google</span></div>
        </div>
    );
};

export default SocialLogin;