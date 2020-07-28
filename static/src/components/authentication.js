import React, { Component } from "react";

export const loginSession = async (params) => {
  return fetch("/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      /* console.log("Success:", data); */
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const registerSession = async (params) => {
  return fetch("/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      /* console.log("Success:", data); */
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getUserData = async () => {
  return fetch("/api/account/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      /* console.log("Success getUserData:", data); */
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const logout = async () => {
  fetch("/api/logout/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success logout:", data);
    })
    .catch((error) => {
      console.error("Error here:", error);
    });
};
