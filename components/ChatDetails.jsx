"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Link from "next/link";
import { EmojiEmotions } from "@mui/icons-material";
import MessageBox from "./MessageBox";

const ChatDetails = ({ chatId }) => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);
  const [text, setText] = useState("");

  const { data: session } = useSession();
  const currentUser = session?.user;

  const getChatDetails = async () => {
    try {
      const res = await fetch(`/api/chats/${chatId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setChat(data);
      setOtherMembers(
        data?.members?.filter((member) => member._id !== currentUser._id)
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser && chatId) getChatDetails();
  }, [currentUser, chatId]);

  const sendText = async () => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          text,
        }),
      });
      if (res.ok) setText("");
    } catch (error) {
      console.log(first);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="chat-details">
      <div className="chat-header">
        {chat?.isGroup ? (
          <>
            <Link href={`/chats/${chatId}/group-info`}>
              <img
                src={chat?.groupPhoto || "/group.png"}
                alt="group=photo"
                className="profilePhoto"
              />
            </Link>
            <div className="text">
              <p>
                {chat?.name} &#160; &#183; &#160; {chat?.members?.length}{" "}
                members
              </p>
            </div>
          </>
        ) : (
          <>
            <img
              src={otherMembers[0].profileImage || "/user.jpg"}
              alt="profile-photo"
              className="profilePhoto"
            />
            <div className="text">
              <p>{otherMembers[0].username}</p>
            </div>
          </>
        )}
      </div>

      <div className="chat-body">
        {chat?.messages?.map((message, index) => (
          <MessageBox key={index} message={message} currentUser={currentUser} />
        ))}
      </div>
      <div className="send-message">
        <div className="prepare-message">
          <EmojiEmotions
            sx={{
              fontSize: "35px",
              color: "#737373",
              cursor: "pointer",
              "&:hover": { color: "red" },
            }}
          />
          <input
            type="text"
            placeholder="Write a message..."
            className="input-field"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div onClick={sendText}>
          <img src="/send.jpg" alt="send" className="send-icon" />
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
