import { AuthForm } from "@/features/auth";
import s from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <div className={s.container}>
      <AuthForm />
    </div>
  );
};
