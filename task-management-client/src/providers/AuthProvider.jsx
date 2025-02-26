import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
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
