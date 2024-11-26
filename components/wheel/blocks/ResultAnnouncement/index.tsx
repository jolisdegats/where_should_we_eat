import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import confetti from "canvas-confetti";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Cookies from "js-cookie";
import { CELEB_ANIMATIONS } from "./animations";

interface ResultAnnouncementProps {
  result: string;
  onAnimationEnd?: () => void;
}

export const ResultAnnouncement = ({
  result,
  onAnimationEnd,
}: ResultAnnouncementProps) => {
  const [showResult, setShowResult] = useState(false);
  const username = Cookies.get("wswe_username");
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isActiveRef = useRef(true);

  const animation = CELEB_ANIMATIONS[username] || {
    text: (result) => `And the winner is ${result}!`,
    className: "default-animation",
  };

  const fireConfetti = useCallback(() => {
    if (!isActiveRef.current) return;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: [
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
      ],
    });

    // Schedule next burst
    timeoutRef.current = setTimeout(fireConfetti, 3000);
  }, []);

  useEffect(() => {
    // Start the animation
    setShowResult(true);
    isActiveRef.current = true;
    fireConfetti();

    // Cleanup function
    return () => {
      isActiveRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fireConfetti]);

  return createPortal(
    <div
      className={styles.resultContainer}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          isActiveRef.current = false;
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          onAnimationEnd?.();
        }
      }}
    >
      <div className={classNames(styles.result, { [styles.show]: showResult })}>
        {animation.gif && (
          <div className={styles.gifContainer}>
            <Image
              src={animation.gif}
              alt={username || "celebration"}
              width={200}
              height={200}
              priority
            />
          </div>
        )}
        <h2>🎉 {animation.text(result)} 🎉</h2>
        <p
          className={classNames(
            styles.resultText,
            styles[animation.className || ""]
          )}
        >
          {result}
        </p>
      </div>
    </div>,
    document.body
  );
};
