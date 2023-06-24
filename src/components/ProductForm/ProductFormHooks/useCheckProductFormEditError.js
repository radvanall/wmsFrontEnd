import { useState } from "react";

const useCheckProductFormEditError = () => {
  const [error, setError] = useState({
    name: false,
    file: false,
    fileName: false,
    description: false,
  });

  const checkError = (data) => {
    data.product_name === "" || data.product_name === null
      ? setError((prev) => ({ ...prev, name: true }))
      : setError((prev) => ({ ...prev, name: false }));
    data.imgName === "" || data.imgName === null
      ? setError((prev) => ({ ...prev, fileName: true }))
      : setError((prev) => ({ ...prev, fileName: false }));
    console.log("error=", error);
    data.product_description === "" || data.product_description === null
      ? setError((prev) => ({ ...prev, description: true }))
      : setError((prev) => ({ ...prev, description: false }));
  };

  return {
    error,
    setError,
    checkError,
  };
};
export default useCheckProductFormEditError;
