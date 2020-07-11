import React from "react";
import "./profileArea.css";
import { Button, Form } from "react-bootstrap";

const ProfileArea = (props) => {
  return (
    <Form className="ProfileArea">
      <h3>Profile for {props.username}</h3>

      <ul>
        <li>Email address: {props.emailAddress}</li>
      </ul>
      <div class="js-profile-editable-area d-flex flex-column d-md-block">
        <div class="">
          <Button
            name="button"
            type="button"
            class="btn btn-block mb-3  js-profile-editable-edit-button"
            data-hydro-click='{"event_type":"user_profile.click","payload":{"profile_user_id":64643592,"target":"INLINE_EDIT_BUTTON","user_id":64643592,"originating_url":"https://github.com/Nilinzm"}}'
            data-hydro-click-hmac="507222b05b78f249e0ad51bf42e477bc20151e5213a9a96254382e29f077382d"
          >
            Edit profile
          </Button>
        </div>

        <div class="p-note user-profile-bio mb-2 js-user-profile-bio"></div>

        <ul class="vcard-details"></ul>
      </div>
    </Form>
  );
};

export default ProfileArea;
