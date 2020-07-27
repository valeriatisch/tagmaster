import React from "react";
import Authentication, { getUserData } from "./authentication";

const CheckAuth = async () => {
  try {
    const data = await getUserData();
    if (data.error) {
      // do the error logic here
      console.log("error in checkauth (return false): ", data);
      return false;
    }
    /*  console.log("no error in checkauth (return true): ", data); */
    return true;
  } catch (e) {
    /*  console.log("catched error in checkauth (return false): "); */
    return false;
  }
};

export default CheckAuth;
