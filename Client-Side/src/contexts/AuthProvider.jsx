import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  getAuth,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up new users
  const signUp = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Sign in existing users
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Sign out the current user
  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Google Sign-In
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Update a user's profile
  const updateUserProfile = async (updateData) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, updateData);
      // User state update
      setUser((currentUser) => ({
        ...currentUser,
        ...updateData,
      }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // console.log("The Current User is:", currentUser);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    loading,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {/* {!loading ? children : null} */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
