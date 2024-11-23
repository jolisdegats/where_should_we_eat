import { Input } from "../../common/Input";
import styles from "./styles.module.scss";

const WelcomeForm = ({
  celebrity,
  username,
  changeUsername,
  handleNextCelebrity,
  changePage,
  buttonText,
}) => {
  return (
    <>
      <div className={styles.inputWrapper}>
        <Input
          name="displayName"
          placeholder={celebrity}
          value={username}
          onChange={(e) => changeUsername(e.target.value)}
          showIcon={true}
          iconType={!username ? "dice" : "close"}
          onIconClick={
            !username ? handleNextCelebrity : () => changeUsername("")
          }
        />
      </div>
      <button className={styles.formButton} type="button" onClick={changePage}>
        {buttonText}
      </button>
    </>
  );
};

export default WelcomeForm;
