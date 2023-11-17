import axios from "axios";
const deleteItem = async (id, endpoint, dispatch, setMessage, jwt) => {
  console.log(jwt);
  await axios
    .put(
      `http://localhost:8080/api/${endpoint}/delete/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((response) => {
      dispatch(setMessage(response.data));
    })
    .catch((error) => {
      dispatch(setMessage(error.message));
    });
};
export default deleteItem;
