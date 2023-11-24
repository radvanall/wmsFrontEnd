import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";

const usePostData = () => {
  const jwt = useSelector((state) => state.userSlice.jwt);
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
      .post(url, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        setMessage(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };
  return { message, loading, error, resetMessage, postData };
};
export default usePostData;
