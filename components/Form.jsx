"use client";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PiChatTeardropDotsFill } from "react-icons/pi";
import { signIn } from "next-auth/react";

const Form = ({ type }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    if (type === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/");
      }
      if (res.error) {
        toast.error("Something went wrong!☹️");
      }
    }

    if (type === "login") {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res.ok) {
        router.push("/chats");
      }
      if (res.error) {
        toast.error("Invalid email or password");
      }
    }
  };
  return (
    <div className="auth">
      <div className="content">
        <img src="/chat.svg" alt="logo" className="logo" />

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <div>
              <div className="input">
                <input
                  defaultValue=""
                  {...register("username", {
                    required: "Username is required!",
                  })}
                  type="text"
                  placeholder="Enter your username"
                  className="input-field"
                />
                <PersonOutline sx={{ color: "#737373" }} />
              </div>
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
          )}

          <div>
            <div className="input">
              <input
                defaultValue=""
                {...register("email", { required: "Email is required!" })}
                type="email"
                placeholder="Enter your email"
                className="input-field"
              />
              <EmailOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="input">
              <input
                defaultValue=""
                {...register("password", {
                  required: "Password is required!",
                  validate: (value) => {
                    if (
                      value.length < 5 ||
                      !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                    ) {
                      return "Password must be atleast 5 characters and must contain at least one special character";
                    }
                  },
                })}
                type="password"
                placeholder="Enter your password"
                className="input-field"
              />
              <LockOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button className="button" type="submit">
            {type === "register" ? "Register" : "Login"}
          </button>
        </form>

        {type === "register" ? (
          <Link href={"/"} className="link">
            <p className="text-center">Already have an account? Login</p>
          </Link>
        ) : (
          <Link href={"/register"} className="link">
            <p className="text-center">Don't have an account? Register</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Form;
