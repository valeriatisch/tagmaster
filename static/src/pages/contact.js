// Contact.js

import React, { useContext } from "react";
import { UserContext } from "../components/UserContext";

export default function Contact() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Contact</h2>
      <h3>{user}</h3>
    </div>
  );
}
