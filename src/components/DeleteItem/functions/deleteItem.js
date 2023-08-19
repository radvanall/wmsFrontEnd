import axios from "axios";
const deleteItem = (id, endpoint, dispatch, setMessage, jwt) => {
  const message = "";
  axios
    .put(`http://localhost:8080/api/${endpoint}/delete/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then((response) => {
      console.log("response=", response);
      //dispatch(fetchItdeleteItems());
      dispatch(setMessage(response.data));
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      dispatch(setMessage(error.message));
    });
};
export default deleteItem;
