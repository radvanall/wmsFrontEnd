import { useState } from "react";
import axios from "axios";
import { toggle as changeState } from "../toolkitRedux/menuSlice";
import { resetJwt, resetUserData } from "../toolkitRedux/userSlice";
import { open } from "../toolkitRedux/sessionExpiredSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";

const useGetData = (url) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.userSlice.jwt);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getData = async (id) => {
    setLoading(true);
    try {
      const fetch = await axios.get(id === null ? url : url + `${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setData(fetch.data);
    } catch (err) {
      if (err.response.status == 403) {
        dispatch(resetJwt());
        dispatch(resetUserData());
        dispatch(changeState(false));
        navigate("/login");
        dispatch(open());
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, getData };
};
export default useGetData;
