import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../toolkitRedux/productsSlice";
const useProductFormEdit = (checkError, setServerResponse, fetchProduct) => {
  const dispatch = useDispatch();
  const Submit = (event, productId) => {
    event.preventDefault();

    const dataEntities = new FormData(event.target);
    dataEntities.append("productId", productId);
    const data = Object.fromEntries(dataEntities.entries());

    checkError(data);
    if (
      data.product_name !== "" &&
      data.product_name !== null &&
      //data.image.size !== 0 &&
      //data.image !== null &&
      data.imgName !== "" &&
      data.imgName !== null &&
      data.product_description !== "" &&
      data.product_description !== null
    ) {
      fetchProduct(dataEntities, setServerResponse, dispatch, fetchProducts);
      console.log("edit data=", data);
    }
  };
  return { Submit };
};
export default useProductFormEdit;
