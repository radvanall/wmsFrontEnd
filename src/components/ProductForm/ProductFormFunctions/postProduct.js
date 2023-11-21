import axios from "axios";
const postProduct = (
  dataEntities,
  setServerResponse,
  dispatch,
  fetchProducts,
  jwt
) => {
  axios
    .post("http://localhost:8080/api/position/uploadPosition", dataEntities, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then((response) => {
      dispatch(fetchProducts(jwt));
      setServerResponse(response.data);
    })
    .catch((error) => setServerResponse(error.message));
};
export default postProduct;
