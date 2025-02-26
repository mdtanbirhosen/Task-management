import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setAuthLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setAuthLoading(true);
        return signOut(auth);
    };

    const registerUser = (email, password) => {
        setAuthLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setAuthLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    

    useEffect(() => {
        setAuthLoading(true); 

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser, authLoading);
            setUser(currentUser);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Shared data
    const authInfo = {
        user,
        setUser,
        googleSignIn,
        authLoading,
        logOut,
        loginUser,
        registerUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;