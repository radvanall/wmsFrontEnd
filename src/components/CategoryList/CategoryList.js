import React, { useState, useEffect } from "react";
import useGetData from "../../hooks/useGetData";
import usePostData from "../../hooks/usePostData";
import useDelete from "../../hooks/useDelete";
import BasicInput from "../BasicInput/BasicInput";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import BasicButton from "../BasicButton/BasicButton";
const CategoryList = ({ endpoint, active, firstLabel, secondLabel, name }) => {
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [displayButtons, setDisplayButtons] = useState(true);
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
    getData: getCategories,
  } = useGetData(`${endpoint}/readAll`);
  const { message, loading, error, resetMessage, postData } = usePostData();
  const {
    message: deleteCategoryMessage,
    error: deleteCategoryError,
    resetMessage: resetDeleteMessage,
    deleteData,
  } = useDelete();
  useEffect(() => {
    if (active) {
      getCategories(null);
      setCategoryInput("");
      setDisplayButtons(true);
    }
  }, [active]);
  console.log("categories:", categories);
  const handleEdit = (id, name) => {
    setCategoryInput(name);
    setDisplayButtons(false);
    setCategoryId(id);
  };
  const changeCategoryName = (e) => {
    setCategoryInput(e.target.value);
  };
  const addCategory = async () => {
    const data = new FormData();
    data.append("category", categoryInput);
    await postData(data, `${endpoint}/create`);
    getCategories(null);
    setTimeout(() => {
      resetMessage();
    }, [3000]);
  };
  const cancelModify = () => {
    setDisplayButtons(true);
    setCategoryInput("");
  };
  const modifyCategory = async () => {
    const data = new FormData();
    data.append("categoryName", categoryInput);
    await postData(data, `${endpoint}/update/${categoryId}`);
    getCategories(null);
    setTimeout(() => {
      resetMessage();
    }, [3000]);
    cancelModify();
  };
  const handleDelete = async (id) => {
    await deleteData(`${endpoint}/delete/${id}`);
    getCategories(null);
    setTimeout(() => {
      resetDeleteMessage();
    }, [3000]);
  };
  return (
    <div>
      <div className="category__input">
        <BasicInput
          type="text"
          fullBorder={true}
          label={displayButtons ? firstLabel : secondLabel}
          value={categoryInput}
          handleChange={changeCategoryName}
        />
      </div>
      {displayButtons ? (
        <div className="add__cancel">
          <BasicButton text="Adaugă" handleClick={addCategory} />
        </div>
      ) : (
        <div className="add__cancel">
          <BasicButton text="Modifică" handleClick={modifyCategory} />
          <BasicButton text="Anulează" handleClick={cancelModify} />
        </div>
      )}
      <ul className="category__list__container">
        {categories &&
          categories.map((category) => (
            <li className="category__list__item" key={category.id}>
              <div className="item__div">
                <span>{category[name]}</span>

                <div className="category__list__buttons">
                  {displayButtons && (
                    <>
                      <button
                        className="invoice__table__button"
                        onClick={() => {
                          handleDelete(category.id);
                        }}
                      >
                        <RiDeleteBin6Line className="category__list__button" />
                      </button>
                      <button
                        className="invoice__table__button"
                        onClick={() => {
                          handleEdit(category.id, category[name]);
                        }}
                      >
                        <TiEdit className="category__list__button" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
      <div className="category__message__box">
        {deleteCategoryMessage && (
          <label style={{ color: "red" }}>{deleteCategoryMessage}</label>
        )}
        {deleteCategoryError && (
          <label style={{ color: "red" }}>{deleteCategoryError}</label>
        )}
        {error && <label style={{ color: "red" }}>{error}</label>}
        {message && <label style={{ color: "red" }}>{message}</label>}
      </div>
    </div>
  );
};

export default CategoryList;
