import axios from "axios";
const deleteItem = async (id, endpoint, dispatch, setMessage, jwt) => {
  const message = "";
  console.log(jwt);
  await axios
    .put(
      `http://localhost:8080/api/${endpoint}/delete/${id}`,
      {},
      {
        // .put(`http://localhost:8080/api/operator/delete/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((response) => {
      console.log("response=", response);
      //dispatch(fetchItdeleteItems());
      dispatch(setMessage(response.data));
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      console.log(error);
      dispatch(setMessage(error.message));
    });
};
export default deleteItem;
