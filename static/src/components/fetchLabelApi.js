import React, { Component } from "react";

export const sendLabel = async (params) => {
  return fetch("/api/images/id/label", {
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
