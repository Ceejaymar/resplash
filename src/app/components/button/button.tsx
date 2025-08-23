import { type PropsWithChildren, type ReactNode } from "react";
import clsx from "clsx";

import classes from "./button.module.scss";

type Button = PropsWithChildren<{
  variant?: "primary" | "secondary" | "danger" | "outline";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
}>;

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className,
  disabled = false,
  isLoading = false,
  icon,
}: Button) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(classes.button, classes[variant], className)}
    >
      {isLoading ? (
        <span className={classes.spinner} aria-hidden="true" />
      ) : (
        <>
          {icon}
          {children && <span>{children}</span>}
        </>
      )}
    </button>
  );
}
