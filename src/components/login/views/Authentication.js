import { useEffect, useContext, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { firebaseAuth } from "../../../utils/context/AuthProvider";
import SignForm from "../blocks/SignForm";
import styles from "./Authentication.module.scss";

const Authentication = (props) => {
  const { handleSignIn, handleSignUp } = useContext(firebaseAuth);

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(
    location.pathname.toLowerCase()
  );

  // Define parameters for each SignForm component
  const signinParams = {
    value: "/signin",
    title: "Feeling hungry?",
    path: ["/", "/signin"],
    action: handleSignIn,
    buttonText: "Let's go!",
    leftButtonText: "Login",
  };

  const signupParams = {
    value: "/signup",
    title: "Let's start!",
    path: ["/signup"],
    action: handleSignUp,
    buttonText: "Create my account",
    leftButtonText: "Create an account",
  };

  // Animation parameters
  const animationVars = {
    "--animation_duration": `2s`,
    "--sidebar_width": `20em`,
  };
  const sidebar_alignment =
    currentPage === signinParams.value
      ? {
          "border-radius": "0 1em 1em 0",
          "box-shadow": "-2px 0px 10px 0px rgb(0 0 0 / 20%)",
        }
      : { left: 0 };
  const form_alignment =
    currentPage === signinParams.value
      ? { left: 0, "border-radius": " 1em 0 0 1em" }
      : {};

  useEffect(() => {
    // Change current page depending on URL
    setCurrentPage(location.pathname.toLowerCase());
  }, [location.pathname]);

  return (
    currentPage && (
      <div className={styles.formContainer}>
        <aside
          className={`${styles.authSidebar}`}
          style={{ ...animationVars, ...sidebar_alignment }}
        >
          <h1>where should we eat today?</h1>
          <div>
            <button
              onClick={() => {
                setCurrentPage(
                  currentPage === signinParams.value
                    ? signupParams.value
                    : signinParams.value
                );
              }}
            >
              {currentPage === signinParams.value
                ? signupParams.leftButtonText
                : signinParams.leftButtonText}
            </button>
          </div>
        </aside>

        <SignForm
          data={
            currentPage === signinParams.value ? signinParams : signupParams
          }
          style={{ ...animationVars, ...form_alignment }}
        ></SignForm>
      </div>
    )
  );
};

export default withRouter(Authentication);
