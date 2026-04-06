import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContextUser = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Persistence: Check localStorage on Mount
  useEffect(() => {
    const savedUser = localStorage.getItem("careerPathUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleGoogleLogin = (credentialResponse) => {
    setLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        displayName: decoded.name,
        email: decoded.email,
        photoURL: decoded.picture,
        uid: decoded.sub, // Unique ID from Google
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

  const userSignOut = () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem("careerPathUser");
    setLoading(false);
    return Promise.resolve();
  };

  // Bridge functions to maintain compatibility with existing components
  const createUser = () => Promise.reject("Use Google Login");
  const createLoginUser = () => Promise.reject("Use Google Login");
  const updateProfileUser = (profile) => {
    const updatedUser = { ...user, ...profile };
    setUser(updatedUser);
    localStorage.setItem("careerPathUser", JSON.stringify(updatedUser));
    return Promise.resolve();
  };

  const authInfo = {
    user,
    setUser,
    loading,
    handleGoogleLogin,
    userSignOut,
    // Maintaining these names for compatibility where possible
    createUser,
    createLoginUser,
    updateProfileUser,
    createUserGoogle: () => {}, // Handled by GoogleLogin component
  };

  return (
    <AuthContextUser.Provider value={authInfo}>
      {children}
    </AuthContextUser.Provider>
  );
};

export default AuthContext;
export { AuthContextUser };
