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
}: InputProps) => {
  return (
    <div className={classNames(styles.inputWrapper, className)}>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {showIcon && (
        <Button
          variant="text"
          type="button"
          onClick={onIconClick}
          className={classNames(styles.iconButton, {
            [styles["iconButton--close"]]: iconType === "close",
          })}
        >
          <Icon type={iconType} />
        </Button>
      )}
    </div>
  );
};
