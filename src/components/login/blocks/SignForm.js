import { useContext, useState } from "react";
import { firebaseAuth } from "../../../utils/context/AuthProvider";
import "./SignForm.module.scss";

const SignForm = ({ data, style }) => {
  const { inputs, setInputs, errors, setErrors } = useContext(firebaseAuth);

  const [verifyPassword, setVerifyPassword] = useState("");

  // Input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "verifyPassword") {
      return setVerifyPassword(value);
    }
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.value === "/signup" && inputs.password !== verifyPassword) {
      setErrors("Both passwords are not identical");
      return;
    }
    await data.action();
  };

  return (
    <form onSubmit={handleSubmit} style={style}>
      <h2>{data.title}</h2>
      {data.value === "/signup" ? (
        <input
          onChange={handleChange}
          name="displayName"
          placeholder="name"
          value={inputs.displayName}
          required
        />
      ) : null}
      <input
        onChange={handleChange}
        name="email"
        placeholder="email"
        value={inputs.email}
        required
      />
      <input
        onChange={handleChange}
        name="password"
        placeholder="password"
        value={inputs.password}
        required
        type="password"
      />
      {data.value === "/signup" ? (
        <input
          onChange={handleChange}
          name="verifyPassword"
          placeholder="password (again)"
          value={verifyPassword}
          required
          type="password"
        />
      ) : null}
      <button type="submit">{data.buttonText}</button>
      {errors ? <p style={{ color: "red" }}>{errors}</p> : null}
    </form>
  );
};

export default SignForm;
