import React from "react";
import Card from "../../components/Card/Card";
import "./InvoiceContentTable.css";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import { BiPlusMedical } from "react-icons/bi";
const InvoiceContentTable = ({
  validated,
  title,
  data,
  isOpenCreate,
  toggleCreate,
  openEdit,
  openDelete,
  isAllowed,
}) => {
  return (
    <Card>
      {validated || !isAllowed ? null : (
        <div className="stock__button__wrapper">
          <BiPlusMedical
            className={
              isOpenCreate
                ? "search_menu_button menu__opened"
                : "search_menu_button menu__closed"
            }
            onClick={toggleCreate}
          />
        </div>
      )}

      <ResponsiveTable
        data={data}
        title={title}
        handleEdit={validated ? null : isAllowed ? openEdit : null}
        handleDelete={validated ? null : isAllowed ? openDelete : null}
      />
    </Card>
  );
};

export default InvoiceContentTable;
