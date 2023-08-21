import axios from "axios";
import { useState } from "react";
import { setJwt, setUserData } from "../toolkitRedux/userSlice";
import { useSelector, useDispatch } from "react-redux";
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

      console.log("userData:", userData);
      navigate("/");
      console.log(response.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        setError(err.response.data);
      } else {
        console.log(err.message);
        setError(err.message);
      }
    }
  };
  return {
    login,
  };
};
export default useAuth;
