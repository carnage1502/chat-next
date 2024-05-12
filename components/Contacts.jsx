"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { RadioButtonUnchecked } from "@mui/icons-material";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const { data: session } = useSession();
  const currentUser = session?.user;

  const getContacts = async () => {
    try {
      const res = await fetch(
        search !== "" ? `/api/users/searchContact/${search}` : "/api/users"
      );
      const data = await res.json();
      setContacts(data.filter((contact) => contact._id !== currentUser._id));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) getContacts();
  }, [currentUser, search]);

  return loading ? (
    <Loader />
  ) : (
    <div className="create-chat-container">
      <input
        placeholder="Search content..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="contact-bar">
        <div className="contact-list">
          <p className="text-body-bold">Select or Deselect</p>
          {contacts.map((user, index) => (
            <div key={index} className="contact">
              <RadioButtonUnchecked />
              <img
                src={user.profileImage || "/user.jpg"}
                alt="profile"
                className="profilePhoto"
              />
              <p className="text-base-solid">{user.username}</p>
            </div>
          ))}
        </div>

        <div className="create-chat">
          <button className="btn">Start a new chat!</button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
