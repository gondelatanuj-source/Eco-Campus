import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Map Firebase user to app user structure (extend if needed)
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    name: currentUser.displayName || 'Student User',
                    photoURL: currentUser.photoURL,
                    // Persist demo fields for now
                    department: 'Computer Science',
                    location: 'North Campus',
                    joined: 'September 2023',
                    badges: ['Early Adopter', 'Zero Waste']
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signup = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        // Manually update local state to reflect name immediately
        setUser(prev => ({ ...prev, name }));
        return userCredential;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        return signOut(auth);
    };

    return (
        <UserContext.Provider value={{ user, signup, login, signInWithGoogle, logout, loading }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
