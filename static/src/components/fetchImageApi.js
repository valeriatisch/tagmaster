import React, { Component, useState } from 'react'

// get IMG ID
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

export const getImageDetails = async (url) => {
    return fetch(url, {
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


export const getImage = async (url) => {

    return fetch(url, {
        method: "GET",
    })
        .then((res) => res.blob())
        .then((blob) => {
            /* console.log("Success:", data); */
            return URL.createObjectURL(blob);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

/* export const usePicture = (url) => {
    const [state, setState] = useState({ picture: null, loading: true });

    useEffect(() => {
        setState({ picture: null, loading: true });
        fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
                setState({
                    picture: URL.createObjectURL(blob),
                    loading: false,
                });
            });
    }, [url]);

    return state;
}; */