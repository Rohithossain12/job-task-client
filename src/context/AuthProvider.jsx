import { createContext, useEffect, useState } from "react";
import auth from "../../public/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [showPassword,setShowPassword]=useState(false) 
  const [errorMessage, setErrorMessage] = useState("");

  // console.log(user)

  // dark and light mode toggle.

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // Create new User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // user login with google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUsers(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    users,
    setUsers,
    createUser,
    loading,
    login,
    setLoading,
    signInWithGoogle,
    logOut,
    errorMessage,
    setErrorMessage,
    showPassword,
    setShowPassword,
    handleToggleTheme,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
