"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/Input";

import s from "./AuthForm.module.scss";
import { useMutation } from "@apollo/client/react";
import { LOGIN, REGISTER } from "@/shared/api/queries";
import { useRouter } from "next/navigation";

// Response type (что возвращает mutation)
type LoginResponse = {
  login: {
    token: string;
    user: { id: string; username: string };
  };
};

type RegisterResponse = {
  register: {
    token: string;
    user: { id: string; username: string };
  };
};

// Variables type (что передаём)
type LoginVars = {
  username: string;
  password: string;
};

export const AuthForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation<LoginResponse, LoginVars>(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.token;
      document.cookie = `token=${token}; path=/; max-age=86400`;
      router.push("/chats");
    },
    onError: (error) => console.error("Login error:", error.message),
  });

  const [register] = useMutation<RegisterResponse, LoginVars>(REGISTER, {
    onCompleted: (data) => {
      document.cookie = `token=${data.register.token}; path=/; max-age=86400`;
      router.push("/chats");
    },
    onError: (error) => console.error("Register error:", error.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      login({ variables: { username: email, password } });
    } else {
      register({ variables: { username: email, password } });
    }
  };

  return (
    <div className={s.card}>
      <h1 className={s.title}>{isLogin ? "Welcome Back" : "Create Account"}</h1>
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          label="username"
          id="username"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit" className={s.button}>
          {isLogin ? "Log in" : "Sign up"}
        </button>
      </form>
      <div className={s.toggleAction}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </div>
    </div>
  );
};
