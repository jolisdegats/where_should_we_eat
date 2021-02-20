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
  const [sidebarRight, setSidebarRight] = useState(false);
  const [fadeAnimation, setFadeAnimation] = useState(false);

  // Define parameters for each SignForm component
  const signinParams = {
    value: "/signin",
    title: "Feeling hungry?",
    path: ["/", "/signin"],
    action: handleSignIn,
    buttonText: "Let's go!",
    leftButtonText: "Back to login",
  };

  const signupParams = {
    value: "/signup",
    title: "Welcome visitor",
    path: ["/signup"],
    action: handleSignUp,
    buttonText: "Create my account",
    leftButtonText: "I don't have an account yet!",
  };

  // Animation parameters
  const animationVars = {
    "--animation_duration": `2s`,
    "--sidebar_width": `50%`,
  };

  const sidebar_alignment = sidebarRight
    ? {
        borderRadius: "0 1em 1em 0",
        boxShadow: "-2px 0px 10px 0px rgb(0 0 0 / 20%)",
      }
    : { left: 0 };
  const form_alignment = sidebarRight
    ? { left: 0, borderRadius: " 1em 0 0 1em" }
    : {};

  const button_animation = fadeAnimation
    ? { opacity: "0%" }
    : { opacity: "100%" };

  const changePage = () => {
    setFadeAnimation(true);
    setSidebarRight(!sidebarRight);
    setTimeout(() => {
      setCurrentPage(
        signinParams.path.includes(currentPage)
          ? signupParams.value
          : signinParams.value
      );
      setFadeAnimation(false);
    }, 550);
  };

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
          {signinParams.path.includes(currentPage) ? (
            <div style={{ ...button_animation }}>
              <img src="/images/spinWheelGif.gif" alt="spinning wheel"></img>
              <h2 className="sidebarTitle">Lunch companion</h2>
              <p>
                Don't know what to eat today? Feeling uninspired as hell? Well
                we've got your back!
              </p>
              <p>
                <b>"Where Should We Eat"</b> will choose your next awesome lunch
                for you based on scientific yet unseizable universe laws (aka
                "complete chance").
              </p>
              <p>Spin the wheel, and let the fun begin!</p>

              <br />
              <button
                onClick={() => {
                  changePage();
                }}
              >
                {signupParams.leftButtonText}
              </button>
            </div>
          ) : (
            <div style={{ ...button_animation }}>
              <img src="/images/catFull.gif" alt="spinning wheel"></img>
              <h2 className="sidebarTitle">First time here?</h2>
              <p>It feels so cool to meet new visitors!</p>
              <p>
                Please make yourself at home. We promise we won't use your data
                for dark and evil operations.
              </p>
              <p>
                Feel free to ask questions or submit improvment ideas on our
                contact page (or on the github project page).
              </p>
              <p>Life is cool when filled with food!</p>
              <br />
              <button
                onClick={() => {
                  changePage();
                }}
              >
                {signinParams.leftButtonText}
              </button>
            </div>
          )}
        </aside>

        <SignForm
          data={
            signinParams.path.includes(currentPage)
              ? signinParams
              : signupParams
          }
          style={{ ...animationVars, ...form_alignment }}
        ></SignForm>
      </div>
    )
  );
};

export default withRouter(Authentication);
