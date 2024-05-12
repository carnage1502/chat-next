"use client";
import { Chat, Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TopBar = () => {
  const pathName = usePathname();

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };

  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="topbar">
      <Link href={"/chats"} className="flex">
        {/* <img src="/chat.svg" alt="logo" className="logo" /> */}
        <Chat className="text-[40px] mt-1" />
        <h1 className="text-[30px] font-semibold inline-block">
          <span className="text-blue-500"> ChatKaro!</span>
        </h1>
      </Link>

      <div className="menu">
        <Link
          href={"/chats"}
          className={`${
            pathName === "/chats" ? "text-red-1" : ""
          } text-heading4-bold`}
        >
          Chats
        </Link>
        <Link
          href={"/contacts"}
          className={`${
            pathName === "/contacts" ? "text-red-1" : ""
          } text-heading4-bold`}
        >
          Contacts
        </Link>

        <Logout
          sx={{ color: "#737373", cursor: "pointer" }}
          onClick={handleLogout}
        />

        <Link href={"/profile"}>
          <img
            src={user?.profileImage || "/user.jpg"}
            alt="profile-image"
            className="profilePhoto"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
