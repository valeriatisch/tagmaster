import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useFetch } from "../components/fetchProfileApi";

import "./profile.css";

const Profile = (props) => {

  const { data, loading } = useFetch(`/api/account`);
  console.log("data: ", data);

  return (
    <div className="total">
      <div className="info">
        {/* <img source={avatar} /> */}
        {!loading ? (
          <h1> {data.email} </h1>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
