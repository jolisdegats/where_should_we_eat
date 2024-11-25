import { useEffect, useState } from "react";
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
  const animation = CELEB_ANIMATIONS[username] || {
    text: (result) => `And the winner is ${result}!`,
    className: "default-animation",
  };

  useEffect(() => {
    setTimeout(() => {
      setShowResult(true);

      // Confetti configuration
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: [
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#FF00FF",
          "#00FFFF",
        ],
      };

      const fireConfetti = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      // Fire multiple confetti bursts
      fireConfetti(0.25, {
        spread: 26,
        startVelocity: 55,
      });

      fireConfetti(0.2, {
        spread: 60,
      });

      fireConfetti(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });

      fireConfetti(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });

      fireConfetti(0.1, {
        spread: 120,
        startVelocity: 45,
      });

      // End animation after duration
      const duration = 4000;
      setTimeout(() => {
        onAnimationEnd?.();
      }, duration);
    }, 100);
  }, [onAnimationEnd]);

  return createPortal(
    <div className={styles.resultContainer}>
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
