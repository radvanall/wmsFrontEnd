import axios from "axios";
const deleteProduct = (id, dispatch, setMessage) => {
  const message = "";
  axios
    .put(`http://localhost:8080/api/position/delete/${id}`)
    .then((response) => {
      console.log("response=", response);
      //dispatch(fetchProducts());
      dispatch(setMessage(response.data));
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      dispatch(setMessage(error.message));
    });
};
export default deleteProduct;
