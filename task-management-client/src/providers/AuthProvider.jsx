import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.config";


export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null)
    const [authLoading, setAuthLoading] = useState(false)

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = ()=>{
        setAuthLoading(true);
        return signInWithPopup(auth, googleProvider);
    }



















useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        console.log(currentUser);
        if(currentUser.email){
            setUser(currentUser)
        }else{
            setUser(currentUser)
        }
        setAuthLoading(false);
        
    })
    return ()=>{
        unsubscribe();
    };
},[])






    // shared data
    const authInfo = {
        user,
        setUser,
        googleSignIn,
        authLoading,
        

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AuthProvider;