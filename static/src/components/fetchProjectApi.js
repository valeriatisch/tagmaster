import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    setState({ data: null, loading: true });
    fetch(url)
      .then((x) => x.text())
      .then((y) => {
        setState({ data: JSON.parse(y), loading: false });
      });
  }, [url]);

  return state;
};

/* export const usePicture = (url) => {
  const [state, setState] = useState({ picture: null, loading: true });

  useEffect(() => {
    setState({ picture: null, loading: true });
    fetch("/api/images/1/file", { responseType: "blob" })
      .then((x) => x.text())
      .then((y) => {
        const parseURL = URL.createObjectURL(blob);
        let img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(parseURL);
          resolve(img);
        };
        img.src = parseURL;
        console.log("img url: ", img.src);
        setState({ picture: y, loading: false });
      });
  }, [url]);

  return state;
}; */

/* export const usePicture = (url) => {
  const [state, setState] = useState({ picture: null, loading: true });

  useEffect(() => {
    setState({ picture: null, loading: true });
    fetch(url)
      .then(response => response.blob())
      .then(images => {
        const outside = URL.createObjectURL(images)
        console.log(outside)
      })
  }, [url]);

  return state; */

export const usePicture = (url) => {
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
};

// export const createProject = async (params) => {
//   return fetch("/api/projects/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(params),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       /* console.log("Success:", data); */
//       return data;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

// export const listProjects = async () => {
//   return fetch("/api/projects/", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       /* console.log("Success getUserData:", data); */
//       return data;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };
