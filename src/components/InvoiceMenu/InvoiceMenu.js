import React from "react";
import { BiPlusMedical } from "react-icons/bi";
import { useToggle } from "../../hooks/useToggle";
import "../productsMenu/ProductsMenu.css";
import CreateInvoice from "../CreateInvoice/CreateInvoice";

const InvoiceMenu = () => {
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);

  return (
    <div>
      <div className="menu__buttons">
        <BiPlusMedical
          className={
            isOpenCreate
              ? "search_menu_button menu__opened"
              : "search_menu_button menu__closed"
          }
          onClick={toggleCreate}
        />
      </div>
      <CreateInvoice active={isOpenCreate} setActive={toggleCreate} />
    </div>
  );
};

export default InvoiceMenu;
