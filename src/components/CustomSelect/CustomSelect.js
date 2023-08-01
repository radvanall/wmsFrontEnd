import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import "./CustomSelect.css";
const CustomSelect = ({
  positions,
  handleSelect,
  image,
  selected,
  setOpened,
  onChange,
  opened,
  readOnly,
}) => {
  // const [opened, setOpened] = useState(false);
  // const [selected, setSelected] = useState("");
  // const [image, setImage] = useState("/img/57x57.png");
  // const handleClick = (event) => {
  //   const element = positions.find(
  //     (obj) => parseInt(obj.id, 10) === parseInt(event.target.id, 10)
  //   );
  //   console.log(element);
  //   setSelected(element.name);
  //   setOpened((prev) => !prev);
  //   setImage(element.image);
  //   setFormFields((prev) => ({
  //     ...prev,
  //     product: event.target.id,
  //   }));
  // };
  // const handleChange = () => {
  //   console.log("position lenght=", positions.length);
  //   if (positions.length > 0) alert("datele introduse vor fi pierdute");
  // };

  return (
    <div>
      <div className="custom_select_selected">
        {/* <img src="/img/57x57.png" /> */}
        <img src={image} />
        <input
          type="text"
          className="select_input"
          // readOnly
          readOnly={readOnly}
          value={selected}
          onChange={onChange}
        />
        <button
          className="select_button"
          onClick={(e) => {
            e.preventDefault();
            setOpened((prev) => !prev);
          }}
        >
          <IoIosArrowDown className={opened ? "opened" : "closed"} />
        </button>
      </div>

      <ul className={opened ? "select_list" : "select_list hidden"}>
        {positions &&
          positions.map((item) => (
            <li
              key={item.id}
              id={item.id}
              className="list_element"
              onClick={handleSelect}
            >
              <img className="list_image" src={item.image} />
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
