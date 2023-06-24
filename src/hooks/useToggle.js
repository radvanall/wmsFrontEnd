import { useState } from "react";

export const useToggle = (initialState) => {
  const [status, setStatus] = useState(initialState);
  const toggleStatus = () => setStatus((prevStatus) => !prevStatus);
  return { status, toggleStatus };
};
