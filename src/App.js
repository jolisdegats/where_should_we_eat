import { useEffect, useContext, useState } from "react";
import { firebaseAuth } from "./utils/context/AuthProvider";
import { Route, Switch } from "react-router-dom";
import Authentication from "./components/login/views/Authentication";
import Main from "./components/wheel/views/Main";
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
        <h1>w.s.w.eat</h1>
        <div className={styles.mainContainer}>
          <Switch>
            {token && <Route exact path="/" component={Main} />}

            <Route
              path={["/signin, /signup", "/"]}
              component={Authentication}
            />
          </Switch>
        </div>
      </div>
    )
  );
};

export default App;
