import axios from "axios";

const postData = (data, url) => {
  axios
    .post(url, data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
  //   console.log(data);
};
export default postData;
