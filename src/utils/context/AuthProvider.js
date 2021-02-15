import React, { useState } from "react";
import { authMethods } from "../firebase/auth/authMethods";

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState(null);
  const [token, setToken] = useState(null);

  const handleSignUp = () => {
    authMethods.signup(inputs.email, inputs.password, setErrors, setToken);
  };

  const handleSignIn = () => {
    authMethods.signin(inputs.email, inputs.password, setErrors, setToken);
  };

  const handleSignOut = () => {
    authMethods.signout(setErrors, setToken);
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
