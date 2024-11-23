import Image from "next/image";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { names } from "./icons/iconNames";

type IconType = (typeof names)[number];
export interface IconProps {
  type: IconType;
  color?: "light" | "dark";
  onClick?: () => void;
  className?: string;
}

export const Icon = ({
  type,
  color = "light",
  onClick,
  className,
}: IconProps) => {
  return (
    <span
      onClick={onClick}
      className={classNames(styles.icon, styles[color], className)}
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
