import axios from "axios";
const postProduct = (
  dataEntities,
  setServerResponse,
  dispatch,
  fetchProducts
) => {
  axios
    .post("http://localhost:8080/api/position/uploadPosition", dataEntities)
    .then((response) => {
      console.log(response);
      dispatch(fetchProducts());
      setServerResponse(response.data);
    })
    .catch((error) => setServerResponse(error.message));
};
export default postProduct;
