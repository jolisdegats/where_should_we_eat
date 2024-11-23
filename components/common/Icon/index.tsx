import Image from "next/image";
import styles from "./styles.module.scss";
import classNames from "classnames";

export interface IconProps {
  type: "dice" | "search" | "close" | "add";
  variant?: "light" | "dark";
  onClick?: () => void;
  className?: string;
}

export const Icon = ({
  type,
  variant = "light",
  onClick,
  className,
}: IconProps) => {
  return (
    <span
      onClick={onClick}
      className={classNames(styles.icon, styles[variant], className)}
    >
      <Image
        src={require(`./icons/${type}.svg`)}
        alt={`${type} icon`}
        width={24}
        height={24}
      />
    </span>
  );
};
