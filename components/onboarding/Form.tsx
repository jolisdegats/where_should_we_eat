import { PageParams } from "@/app/welcome/types";
import styles from "./form.module.scss";
import { ANIMATION_VARS, ROUTES } from "@/app/welcome/constants";
import { ChangeEvent } from "react";
import WelcomeForm from "./WelcomeContent/WelcomeForm";
import AddPlacesForm from "./AddPlaces/AddPlacesForm";

const pageParams: Record<string, PageParams> = {
  addPlaces: {
    value: ROUTES.ADD_PLACES,
    title: "Add your fav places",
    path: [ROUTES.ADD_PLACES],
    buttonText: "Add a new cool place",
    leftButtonText: "I want to spin now!",
  },
  welcome: {
    value: ROUTES.WELCOME,
    title: "What's your name?",
    path: [ROUTES.WELCOME],
    buttonText: "Let's go!",
  },
};

export const Form = ({
  isAddPlacesPage,
  celebrity,
  username,
  changeUsername,
  handleNextCelebrity,
  changePage,
  sidebarRight,
}: {
  isAddPlacesPage: boolean;
  celebrity: string;
  username: string;
  changeUsername: (value: string) => void;
  handleNextCelebrity: () => void;
  changePage: () => void;
  sidebarRight: boolean;
}) => {
  const data = isAddPlacesPage ? pageParams.addPlaces : pageParams.welcome;
  const formAlignment = sidebarRight
    ? { left: 0, borderRadius: "1em 0 0 1em" }
    : {};

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ ...ANIMATION_VARS, ...formAlignment }}
      className={styles.form}
    >
      <h2>{data.title}</h2>
      {isAddPlacesPage ? (
        <AddPlacesForm />
      ) : (
        <WelcomeForm
          celebrity={celebrity}
          username={username}
          changeUsername={changeUsername}
          handleNextCelebrity={handleNextCelebrity}
          changePage={changePage}
          buttonText={data.buttonText}
        />
      )}
    </form>
  );
};
