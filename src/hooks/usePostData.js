import { useState } from "react";
import axios from "axios";

const usePostData = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resetMessage = () => {
    setMessage(null);
    setLoading(false);
    setError(null);
  };
  const postData = async (data, url) => {
    setLoading(true);
    await axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.response.data);
        setError(error.response.data);
        setLoading(false);
      });

    //   console.log(data);
  };
  return { message, loading, error, resetMessage, postData };
};
export default usePostData;
