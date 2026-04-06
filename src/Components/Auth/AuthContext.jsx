import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";

const AuthContextUser = createContext();
const provider = new GoogleAuthProvider();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createLoginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateProfileUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const createUserGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const userSignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const disconnect = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      disconnect();
    };
  }, []);

  const authInfo = {
    createUser,
    createLoginUser,
    user,
    setUser,
    updateProfileUser,
    userSignOut,
    createUserGoogle,
    loading,
    resetPassword,
  };

  return (
    <AuthContextUser.Provider value={authInfo}>
      {children}
    </AuthContextUser.Provider>
  );
};

export default AuthContext;
export { AuthContextUser };
