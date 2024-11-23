"use client";
import { useState, useRef } from "react";
import { Sidebar } from "../../components/onboarding/Sidebar";
import styles from "./styles.module.scss";
import { setCookie } from "cookies-next";
import { Form } from "@/components/onboarding/Form";
import { CELEBRITIES, ROUTES } from "./constants";

const shuffleArrayWithInitial = (
  array: readonly string[],
  initialIndex: number
) => {
  const shuffled = [...array];
  const initialCelebrity = shuffled[initialIndex];
  shuffled.splice(initialIndex, 1);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  shuffled.unshift(initialCelebrity);
  return shuffled;
};

interface OnboardingProps {
  initialCelebrityNumber: number;
  initialUsername: string;
}

const Onboarding = ({
  initialCelebrityNumber,
  initialUsername = "",
}: OnboardingProps) => {
  const [currentPage, setCurrentPage] = useState<
    (typeof ROUTES)[keyof typeof ROUTES]
  >(ROUTES.WELCOME);
  const [sidebarRight, setSidebarRight] = useState(false);
  const [fadeAnimation, setFadeAnimation] = useState(false);
  const [username, setUsername] = useState<string>(initialUsername);
  const saveUsername = (value: string) => {
    value = value.trimEnd().trimStart();
    setUsername(value);
    setCookie("wswe_username", value);
  };
  const initialIndex = Math.floor(initialCelebrityNumber * CELEBRITIES.length);
  const shuffledCelebrities = useRef(
    shuffleArrayWithInitial(CELEBRITIES, initialIndex)
  );
  const currentIndex = useRef(0);
  const [celebrity, setCelebrity] = useState(
    () => shuffledCelebrities.current[currentIndex.current]
  );
  const handleNextCelebrity = () => {
    currentIndex.current = (currentIndex.current + 1) % CELEBRITIES.length;
    setCelebrity(shuffledCelebrities.current[currentIndex.current]);
  };

  const changePage = () => {
    currentPage === ROUTES.WELCOME && saveUsername(username || celebrity);

    setFadeAnimation(true);
    setSidebarRight(!sidebarRight);

    setTimeout(() => {
      setCurrentPage(
        currentPage === ROUTES.ADD_PLACES ? ROUTES.WELCOME : ROUTES.ADD_PLACES
      );
      setFadeAnimation(false);
    }, 550);
  };

  return currentPage ? (
    <div className={styles.pageContainer}>
      <Sidebar
        changePage={changePage}
        isAddPlacesPage={currentPage === ROUTES.ADD_PLACES}
        sidebarRight={sidebarRight}
        fadeAnimation={fadeAnimation}
      />
      <Form
        sidebarRight={sidebarRight}
        isAddPlacesPage={currentPage === ROUTES.ADD_PLACES}
        celebrity={celebrity}
        username={username}
        changeUsername={(value: string) => setUsername(value)}
        handleNextCelebrity={handleNextCelebrity}
        changePage={changePage}
      />
    </div>
  ) : null;
};

export default Onboarding;
