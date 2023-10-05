import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./CustomSelect.css";
import imgLink from "../../googleAPI";
const CustomSelect = ({
  positions,
  handleSelect,
  image,
  disableSelect,
  selected,
  setOpened,
  handleChange,
  opened,
  readOnly,
  zIndex,
}) => {
  return (
    <div>
      <div className="custom_select_selected">
        {image && <img src={imgLink + image} />}
        <input
          type="text"
          className="select_input"
          readOnly={readOnly || disableSelect}
          value={selected}
          onChange={handleChange}
        />
        <button
          className={disableSelect ? "disabled" : "select_button"}
          onClick={(e) => {
            e.preventDefault();
            !disableSelect && setOpened((prev) => !prev);
          }}
        >
          {!disableSelect && (
            <IoIosArrowDown className={opened ? "opened" : "closed"} />
          )}
        </button>
      </div>

      <ul
        className={opened ? "select_list" : "select_list hidden"}
        style={zIndex ? { zIndex: zIndex } : { zIndex: 3 }}
      >
        {positions &&
          positions.map((item) => (
            <li
              key={item.id}
              id={item.id}
              className="list_element"
              onClick={handleSelect}
            >
              {image && (
                <img className="list_image" src={imgLink + item.image} />
              )}
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
