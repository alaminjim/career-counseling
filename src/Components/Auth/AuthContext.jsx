import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { jwtDecode } from "jwt-decode";

const AuthContextUser = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Persistence for Google OAuth (manual profile fetch)
  const handleGoogleLogin = async (tokenResponse) => {
    setLoading(true);
    try {
      // Fetch User Info using the access_token
      const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      const decoded = await response.json();
      
      const userData = {
        displayName: decoded.name,
        email: decoded.email,
        photoURL: decoded.picture,
        uid: decoded.sub,
      };
      
      setUser(userData);
      localStorage.setItem("careerPathUser", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Auth Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Firebase Auth Handlers (Restored)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createLoginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateProfileUser = (profile) => {
    // Check if user is Firebase-based or Google-based
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, profile);
    } else {
      const updatedUser = { ...user, ...profile };
      setUser(updatedUser);
      localStorage.setItem("careerPathUser", JSON.stringify(updatedUser));
      return Promise.resolve();
    }
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const userSignOut = () => {
    setLoading(true);
    // Sign out from Firebase
    return signOut(auth).then(() => {
      // Clear manual Google state
      setUser(null);
      localStorage.removeItem("careerPathUser");
      setLoading(false);
    });
  };

  // Combined Monitor (Firebase + LocalStorage for Google)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        // If not Firebase user, check for persisted Google user
        const savedUser = localStorage.getItem("careerPathUser");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    createLoginUser,
    updateProfileUser,
    resetPassword,
    userSignOut,
    handleGoogleLogin,
    createUserGoogle: () => {}, // Direct Google uses GoogleLogin component
  };

  return (
    <AuthContextUser.Provider value={authInfo}>
      {children}
    </AuthContextUser.Provider>
  );
};

export default AuthContext;
export { AuthContextUser };
