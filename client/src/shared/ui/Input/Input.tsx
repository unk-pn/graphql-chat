import { type InputHTMLAttributes } from "react";

import { Label } from "@/shared/ui/Label";

import s from "./Input.module.scss";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> {
  label: string;
  id: string;
  error?: string;
  className?: string;
}

export const Input = ({
  label,
  id,
  error,
  className,
  ...inputProps
}: InputProps) => {
  return (
    <div className={`${s.inputGroup} ${className || ""}`}>
      <Label htmlFor={id}>{label}</Label>
      <input id={id} {...inputProps} />
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
};
