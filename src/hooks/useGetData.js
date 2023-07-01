import { useState, useEffect } from "react";
import axios from "axios";

const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getData = async (id) => {
    setLoading(true);
    try {
      const fetch = await axios.get(
        url + `${id}`
        //   , {
        //     headers: {
        //       Accept: "application/json",
        //     },
        // }
      );
      console.log("data is: ", fetch);
      setData(fetch.data);
      //const product = response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    // axios
    //   .get(url + `${id}`)
    //   .then((response) => {
    //     const product = response.data; // extract the person object from the response data
    //     const imageUrl = URL.createObjectURL(
    //       new Blob([product.image], { type: "image/jpeg" })
    //     ); // create object URL from binary image data
    //     // do something with the person object and image URL (e.g. display them on the page)
    //     setData(product);
    //     setImg(imageUrl);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setLoading(false);
    //   })
    //   .finally(setLoading(false));
  };
  return { data, loading, error, getData };
};
export default useGetData;
