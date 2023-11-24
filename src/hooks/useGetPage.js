import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { toggle as changeState } from "../toolkitRedux/menuSlice";
import { resetJwt, resetUserData } from "../toolkitRedux/userSlice";
import { open } from "../toolkitRedux/sessionExpiredSlice";
import { useNavigate } from "react-router-dom";

const useGetPage = (url, filters) => {
  const jwt = useSelector((state) => state.userSlice.jwt);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [size, setSize] = useState(20);
  const [sortDirection, setSortDirection] = useState("DESC");
  const toggleSortDirection = () => {
    if (sortDirection === "DESC") setSortDirection("ASC");
    else setSortDirection("DESC");
  };
  const getPage = async (page, filterCriteria) => {
    setLoading(true);
    try {
      const response = await axios.post(
        url + `/?page=${page}&size=${size}&sortDirection=${sortDirection}`,
        filterCriteria ? filterCriteria : undefined,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      setData(response.data);
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
  useEffect(() => {
    getPage(0, filters);
  }, [size, sortDirection]);
  return {
    data,
    loading,
    error,
    size,
    sortDirection,
    getPage,
    setSize,
    toggleSortDirection,
  };
};

export default useGetPage;
