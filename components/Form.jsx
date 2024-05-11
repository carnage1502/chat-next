import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import { PiChatTeardropDotsFill } from "react-icons/pi";

const Form = ({ type }) => {
  return (
    <div className="auth">
      <div className="content">
        <PiChatTeardropDotsFill className="text-red-500" size={"4rem"} />

        <form className="form">
          {type === "register" && (
            <div className="input">
              <input
                type="text"
                placeholder="Enter your username"
                className="input-field"
              />
              <PersonOutline sx={{ color: "#737373" }} />
            </div>
          )}

          <div className="input">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field"
            />
            <EmailOutlined sx={{ color: "#737373" }} />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Enter your password"
              className="input-field"
            />
            <LockOutlined sx={{ color: "#737373" }} />
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
