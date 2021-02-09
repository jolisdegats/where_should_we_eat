import { useEffect, useContext, useState } from "react";
import { firebaseAuth } from "./utils/context/AuthProvider";
import { Route, Switch } from "react-router-dom";
import SignUp from "./views/login/SignUp";
import SignIn from "./views/login/SignIn";
import Main from "./views/Main";
import styles from "./App.module.scss";

const App = () => {
  const { token, setToken } = useContext(firebaseAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.token && setToken(localStorage.token);
    setIsLoading(false);
  }, [setToken]);

  return (
    !isLoading && (
      <div className={styles.container}>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (token ? <Main /> : <SignIn />)}
          />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </div>
    )
  );
};

export default App;
