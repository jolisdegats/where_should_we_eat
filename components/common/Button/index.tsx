import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "button" | "text";
  color?: "light" | "dark";
  className?: string;
}

export const Button = ({
  children,
  variant = "button",
  color = "light",
  className = "",
  ...props
}: ButtonProps) => {
  if (variant === "text") {
    return (
      <button
        className={classNames(styles.textLink, styles[color], className)}
        type="button"
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={classNames(styles.button, className)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
