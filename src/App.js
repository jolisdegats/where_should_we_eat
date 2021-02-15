import { useEffect, useContext, useState } from "react";
import { firebaseAuth } from "./utils/context/AuthProvider";
import { Route, Switch } from "react-router-dom";
import Authentication from "./components/login/views/Authentication";
import Main from "./components/views/Main";
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
          {token && <Route exact path="/" component={Main} />}

          <Route path={["/signin, /signup", "/"]} component={Authentication} />
        </Switch>
      </div>
    )
  );
};

export default App;
