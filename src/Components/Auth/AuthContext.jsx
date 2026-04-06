import { createContext, useEffect, useState } from "react";
import { useUser, useClerk, useSignIn, useSignUp } from "@clerk/clerk-react";

const AuthContextUser = createContext();

const AuthContext = ({ children }) => {
  const { user: clerkUser, isLoaded: userLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLoaded) {
      if (clerkUser) {
        setUser({
          displayName: clerkUser.fullName,
          email: clerkUser.primaryEmailAddress?.emailAddress,
          photoURL: clerkUser.imageUrl,
          uid: clerkUser.id,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [clerkUser, userLoaded]);

  const createUser = async (email, password) => {
    if (!signUpLoaded) return;
    setLoading(true);
    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
      });
      // In a real flow, you'd handle email verification here
      return result;
    } finally {
      setLoading(false);
    }
  };

  const createLoginUser = async (email, password) => {
    if (!signInLoaded) return;
    setLoading(true);
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      return result;
    } finally {
      setLoading(false);
    }
  };

  const updateProfileUser = async (profile) => {
    if (!clerkUser) return;
    
    const updates = {};
    if (profile.displayName) {
      const parts = profile.displayName.split(" ");
      updates.firstName = parts[0];
      updates.lastName = parts.slice(1).join(" ") || "";
    }
    
    await clerkUser.update(updates);
    
    if (profile.photoURL) {
      // Clerk's setProfileImage expects a file or Blob, but for URLs we might 
      // need to handle differently or just rely on Clerk's default image handling.
      // For now, we'll just update the user metadata if needed or provide a log.
      console.log("Clerk profile image update requested for:", profile.photoURL);
    }
    
    return Promise.resolve();
  };

  const createUserGoogle = async () => {
    if (!signInLoaded) return;
    return signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/",
      redirectUrlComplete: "/",
    });
  };

  const userSignOut = () => {
    setLoading(true);
    return signOut();
  };

  const resetPassword = async (email) => {
    if (!signInLoaded) return;
    // Clerk handles password reset via sign-in flow
    return signIn.create({
      identifier: email,
      strategy: "reset_password_email_code",
    });
  };

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
