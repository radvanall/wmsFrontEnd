import React from "react";
import { toggle as changeState } from "../toolkitRedux/menuSlice";
import { resetJwt, resetUserData } from "../toolkitRedux/userSlice";
import { open } from "../toolkitRedux/sessionExpiredSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";

const useFetch = (url) => {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.userSlice.jwt);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status == 403) {
            dispatch(resetJwt());
            dispatch(resetUserData());
            dispatch(changeState(false));
            navigate("/login");
            dispatch(open());
          }
          throw Error("Eroare la conectare..");
        }
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        setData(res);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  return { data, loading, error, fetchData };
};

export default useFetch;
