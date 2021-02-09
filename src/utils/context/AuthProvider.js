import React, { useState } from "react";
import { authMethods } from "../firebase/auth/authMethods";

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);

  const handleSignUp = () => {
    authMethods.signUp(inputs.email, inputs.password, setErrors, setToken);
  };

  const handleSignIn = () => {
    authMethods.signIn(inputs.email, inputs.password, setErrors, setToken);
  };

  const handleSignOut = () => {
    authMethods.signOut(setErrors, setToken);
  };

  return (
    <firebaseAuth.Provider
      value={{
        handleSignUp,
        handleSignIn,
        handleSignOut,
        inputs,
        setInputs,
        errors,
        token,
        setToken,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};
export default AuthProvider;
