import React, { Component } from 'react'

export const getNextImage = async () => {
    return fetch("/api/next/", {
        method: "GET",
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