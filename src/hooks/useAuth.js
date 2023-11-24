import axios from "axios";
import { useState } from "react";
import { setJwt, setUserData } from "../toolkitRedux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const login = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/authenticate",
        data
      );
      setError(null);
      const { jwt, ...userData } = response.data;
      dispatch(
        setUserData({
          ...userData,
        })
      );
      dispatch(setJwt(jwt));
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
    }
  };
  return {
    login,
    error,
  };
};
export default useAuth;
