import { ChangeEvent } from "react";
import { Icon, IconProps } from "@/components/common/Icon";
import styles from "./styles.module.scss";
import { Button } from "../Button";
import classNames from "classnames";

interface InputProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
  showIcon?: boolean;
  iconType?: IconProps["type"];
  className?: string;
  color?: "light" | "dark";
}

export const Input = ({
  className,
  name,
  placeholder,
  value,
  onChange,
  onIconClick,
  showIcon = false,
  iconType = "dice",
  color = "light",
}: InputProps) => {
  return (
    <div className={classNames(styles.inputWrapper, styles[color], className)}>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {showIcon && (
        <Button
          variant="text"
          color={color}
          type="button"
          onClick={onIconClick}
          className={classNames(styles.iconButton, {
            [styles["iconButton--close"]]: iconType === "close",
          })}
        >
          <Icon color={color} type={iconType} />
        </Button>
      )}
    </div>
  );
};
