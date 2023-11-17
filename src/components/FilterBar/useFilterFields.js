import { useDispatch, useSelector } from "react-redux";
import { setData, setDisplaiedData } from "../../toolkitRedux/productsSlice";
import { useState } from "react";
const useFilterFields = (criterias) => {
  const [filterCriterias, setFilterCriterias] = useState(criterias);
  const data = useSelector((state) => state.productsSlice.data);
  const dispatch = useDispatch();

  const filterData = () => {
    const filteredData = data.filter(
      (item) =>
        (item.categorie === filterCriterias.category ||
          filterCriterias.category === "toate") &&
        (item.subcategorie === filterCriterias.subcategory ||
          filterCriterias.subcategory === "toate") &&
        (item.unitate === filterCriterias.unity ||
          filterCriterias.unity === "toate") &&
        (item.producator === filterCriterias.manufacturer ||
          filterCriterias.manufacturer === "toate") &&
        (parseInt(item.pret, 10) >= parseInt(filterCriterias.minPrice, 10) ||
          filterCriterias.minPrice === "0") &&
        (parseInt(item.pret, 10) <= parseInt(filterCriterias.maxPrice, 10) ||
          filterCriterias.maxPrice === "0") &&
        (parseInt(item.cantitate, 10) >=
          parseInt(filterCriterias.minQuantity, 10) ||
          filterCriterias.minQuantity === "0") &&
        (parseInt(item.cantitate, 10) <=
          parseInt(filterCriterias.maxQuantity, 10) ||
          filterCriterias.maxQuantity === "0")
    );

    dispatch(setDisplaiedData(filteredData));
  };
  const resetData = () => {
    setFilterCriterias(criterias);
    dispatch(setDisplaiedData(data));
  };
  const handleFilterSettings = (key, value) => {
    if (
      key === "minPrice" &&
      parseInt(value, 10) > parseInt(filterCriterias.maxPrice, 10) &&
      filterCriterias.maxPrice !== "0"
    ) {
      setFilterCriterias((prevState) => ({
        ...prevState,
        maxPrice: value,
        [key]: value,
      }));
      return;
    }
    if (
      key === "minQuantity" &&
      parseInt(value, 10) > parseInt(filterCriterias.maxQuantity, 10) &&
      filterCriterias.maxQuantity !== "0"
    ) {
      setFilterCriterias((prevState) => ({
        ...prevState,
        maxQuantity: value,
        [key]: value,
      }));
      return;
    }
    setFilterCriterias((prevState) => ({ ...prevState, [key]: value }));
  };

  return {
    filterCriterias,
    setFilterCriterias,
    filterData,
    resetData,
    handleFilterSettings,
  };
};
export default useFilterFields;
