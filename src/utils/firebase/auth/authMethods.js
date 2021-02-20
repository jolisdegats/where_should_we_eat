import "../firebaseIndex";
import firebase from "firebase";

export const authMethods = {
  signup: (displayName, email, password, setErrors, setToken, setUser) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        await res.user.updateProfile({
          displayName: displayName,
        });
        const token = await Object.entries(res.user)[5][1].b;
        localStorage.setItem("token", token);
        setToken(window.localStorage.token);
        setUser(res.user.displayName);
      })
      .catch((err) => {
        setErrors(err.message);
      });
  },
  signin: (email, password, setErrors, setToken, setUser) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b;
        localStorage.setItem("token", token);
        setToken(window.localStorage.token);
        setUser(res.user.displayName);
      })
      .catch((err) => {
        setErrors(err.message);
      });
  },

  signout: (setErrors, setToken, setUser) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      })
      .catch((err) => {
        setErrors(err.message);
        localStorage.removeItem("token");
        setToken(null);
      });
  },
  getusername: (setUser) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName);
      }
    });
  },
};
