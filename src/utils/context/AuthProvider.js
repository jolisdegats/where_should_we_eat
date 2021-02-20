import React, { useState } from "react";
import { authMethods } from "../firebase/auth/authMethods";

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState("");

  const [inputs, setInputs] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const [token, setToken] = useState(null);

  const handleSignUp = () => {
    authMethods.signup(
      inputs.displayName,
      inputs.email,
      inputs.password,
      setErrors,
      setToken,
      setUser
    );
  };

  const handleSignIn = () => {
    authMethods.signin(
      inputs.email,
      inputs.password,
      setErrors,
      setToken,
      setUser
    );
  };

  const handleSignOut = () => {
    authMethods.signout(setErrors, setToken, setUser);
  };

  const getUserName = () => authMethods.getusername(setUser);

  return (
    <firebaseAuth.Provider
      value={{
        handleSignUp,
        handleSignIn,
        handleSignOut,
        getUserName,
        user,
        inputs,
        setInputs,
        errors,
        setErrors,
        token,
        setToken,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};
export default AuthProvider;
