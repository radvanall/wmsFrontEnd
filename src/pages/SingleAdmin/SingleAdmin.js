import React from "react";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { useParams } from "react-router-dom";
import usePostData from "../../hooks/usePostData";
import moment from "moment";
import getFormatedDate from "../../functions/getFormatedDate";
import Calendar from "../../components/Calendar/Calendar";
import SingleOperatorMenu from "../../components/SingleOperatorMenu/SingleOperatorMenu";
import Operator from "../operator/Operator";
import AdminPageTable from "../../components/AdminPageTable/AdminPageTable";

const SingleAdmin = () => {
  const { administratorId } = useParams();
  const [admin, setAdmin] = useState({});
  const [workedDays, setWorkedDays] = useState([]);
  const {
    message,
    loading: postLoading,
    error: postError,
    resetMessage,
    postData,
  } = usePostData();
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/administrator/read/"
  );
  const getInvoices = (invoice) => ({
    id: invoice.id,
    Furnizor: invoice.provider,
    ["Creată de"]: invoice.createdBy,
    ["Data creării"]: getFormatedDate(invoice.dateOfCreation, "RO-ro"),
    ["Data validării"]: getFormatedDate(invoice.dateOfValidation, "RO-ro"),
    ["Prețul total de cumpărare"]: invoice.totalBuyingPrice,
    ["Prețul total de vînzare"]: invoice.totalSellingPrice,
  });
  useEffect(() => {
    if (data) {
      const { workedDays, ...administratorData } = data;
      const today = moment();
      let hoursWorkedThisMonth = 0;
      if (workedDays.length > 0) {
        workedDays.forEach((day) => {
          const momentDay = moment(day.data, "YYYY-MM-DD HH:mm:ss.S");
          if (
            momentDay.isSame(today, "month") &&
            momentDay.isSame(today, "year")
          )
            hoursWorkedThisMonth += day.workedHours;
        });
      }
      setAdmin({ ...administratorData, hoursThisMonth: hoursWorkedThisMonth });
      setWorkedDays(workedDays);
    }
  }, [data]);
  useEffect(() => {
    getData(administratorId);
  }, [administratorId]);

  const handleHours = async (hours, selectedDay) => {
    const queryParams = `?id=${administratorId}&date=${selectedDay.toLocaleDateString(
      "RO-ro"
    )}&workedHours=${hours}`;
    await postData(
      {},
      "http://localhost:8080/api/administrator/setWorkedHours" + queryParams
    );
    getData(administratorId);
  };
  return (
    <div className="Single">
      {admin && data && (
        <SingleOperatorMenu
          operator={admin}
          fetchData={() => getData(administratorId)}
          user="administrator"
          url="http://localhost:8080/api/administrator/updateAdmin/"
          navigateTo="/administrators"
          isEraseble={parseInt(administratorId) !== 1 ? true : false}
        />
      )}
      {admin && data && <Operator operator={admin} />}
      {data && (
        <Calendar
          operator={admin}
          workedDays={workedDays}
          handleHours={handleHours}
        />
      )}
      <AdminPageTable
        getId={administratorId}
        url={
          "http://localhost:8080/api/invoiceReception/readInvoiceReceptionTable/"
        }
        getFields={getInvoices}
        title="Facturi validate the administratorul dat:"
        navTo="invoices"
        width="95%"
      />
    </div>
  );
};

export default SingleAdmin;
