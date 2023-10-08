import axios from "axios";
const putProduct = (
  dataEntities,
  setServerResponse,
  dispatch,
  fetchProducts,
  jwt
) => {
  axios
    .put("http://localhost:8080/api/position/update", dataEntities, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then((response) => {
      console.log(response);
      dispatch(fetchProducts(jwt));
      setServerResponse(response.data);
    })
    .catch((error) => setServerResponse(error.message));
};
export default putProduct;
