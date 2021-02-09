import { useContext } from "react";
import { firebaseAuth } from "../../utils/context/AuthProvider";
import styles from "./Sign.module.scss";

const SignIn = () => {
  const { handleSignIn, inputs, setInputs, errors, setErrors } = useContext(
    firebaseAuth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignIn(inputs.email, inputs.password, setErrors);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit}>
        SignIn
        <input
          onChange={handleChange}
          name="email"
          placeholder="email"
          value={inputs.email}
        />
        <input
          onChange={handleChange}
          name="password"
          placeholder="password"
          value={inputs.password}
        />
        <button>signin</button>
        {errors.length > 0
          ? errors.map((error) => <p style={{ color: "red" }}>{error}</p>)
          : null}
      </form>
    </div>
  );
};

export default SignIn;
