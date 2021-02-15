import { useContext } from "react";
import { firebaseAuth } from "../../../utils/context/AuthProvider";
import "./SignForm.module.scss";

const SignForm = ({ data, style }) => {
  const { inputs, setInputs, errors } = useContext(firebaseAuth);
  // Input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    await data.action();
  };

  return (
    <form onSubmit={handleSubmit} style={style}>
      <h2>{data.title}</h2>
      {data.value === "/signup" ? (
        <input
          onChange={handleChange}
          name="name"
          placeholder="name"
          value={inputs.name}
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
      <button type="submit">{data.buttonText}</button>
      {errors ? <p style={{ color: "red" }}>{errors}</p> : null}
    </form>
  );
};

export default SignForm;
