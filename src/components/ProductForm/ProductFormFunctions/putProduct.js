import axios from "axios";
const putProduct = (
  dataEntities,
  setServerResponse,
  dispatch,
  fetchProducts
) => {
  axios
    .put("http://localhost:8080/api/position/update", dataEntities)
    .then((response) => {
      console.log(response);
      dispatch(fetchProducts());
      setServerResponse(response.data);
    })
    .catch((error) => setServerResponse(error.message));
};
export default putProduct;
