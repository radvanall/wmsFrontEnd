import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../toolkitRedux/productsSlice";
const useProductFormSubmit = (checkError, setServerResponse, fetchProduct) => {
  const dispatch = useDispatch();
  const Submit = (event) => {
    event.preventDefault();

    const dataEntities = new FormData(event.target);
    const data = Object.fromEntries(dataEntities.entries());
    checkError(data);
    if (
      data.product_name !== "" &&
      data.product_name !== null &&
      data.image.size !== 0 &&
      data.image !== null &&
      data.imgName !== "" &&
      data.imgName !== null &&
      data.product_description !== "" &&
      data.product_description !== null
    ) {
      fetchProduct(dataEntities, setServerResponse, dispatch, fetchProducts);
    }
  };
  return { Submit };
};
export default useProductFormSubmit;
