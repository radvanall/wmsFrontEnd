import React from "react";
import getFormatedDate from "../../functions/getFormatedDate";
// import logo from "../../../public/img.redux.svg";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const PDFFile = ({ invoiceHeader, data }) => {
  const tableHeader = Object.keys(data[0]);
  console.log(invoiceHeader);
  const cellWidth = 100 / tableHeader.length;
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 20,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderTopWidth: 0,
    },
    tableRow: {
      margin: "auto",
      display: "flex",
      flexDirection: "row",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      padding: "5px",
      borderBottomWidth: 0,
    },
    tableCell: {
      margin: "auto",
      width: `${cellWidth}%`,
      // margin: 5,
      // padding: 5,

      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    header: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    footer: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: "50px",
      paddingRight: "10px",
    },
    leftHeader: {
      width: "auto",
      display: "flex",
      flexDirection: "row",
    },
    logoWrapper: {
      width: "100%",
      display: "flex",
      paddingTop: "100px",
      justifyContent: "center",
    },
    logo: {
      height: "100px",
      width: "100px",
      alignSelf: "center",
    },
    invoieField: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: "10px",
      padding: "5px",
    },
    totalSum: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      textAlign: "end",
      padding: "10px",
    },
    footerText: {
      borderTopWidth: "1px",
      maxWidth: "200px",
      borderStyle: "solid",
      textAlign: "right",
      //   lineHeight: "24px",
      marginTop: "15px",
      paddingTop: "5px",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Text>Furnizor:</Text>
            <Text>{invoiceHeader.provider}</Text>
          </View>
          <View style={styles.leftHeader}>
            <Text>Cumparator:</Text>
            <Text>{invoiceHeader.customer}</Text>
          </View>
        </View>
        <View style={styles.logoWrapper}>
          <Image style={styles.logo} src={"/img/logo.jpg"} />
          <View style={styles.invoieField}>
            <Text>Factura nr:</Text>
            <Text>{invoiceHeader.id}</Text>
          </View>
          <View style={styles.invoieField}>
            <Text>Data:</Text>
            <Text>{getFormatedDate(invoiceHeader.date, "RO-ro")}</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {tableHeader.map((item, index) => (
              <View style={styles.tableCell} key={index}>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
          {data.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              {Object.keys(item).map((key) => (
                <View style={styles.tableCell} key={key}>
                  <Text>{item[key]}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.totalSum}>
          <Text style={styles.footerText}>
            Suma facturii: {invoiceHeader.totalBuyingPrice} lei.
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.leftHeader}>
            <Text>Semnătura furnizorului:</Text>
          </View>
          <View style={styles.leftHeader}>
            <Text>Semnătura cumpărătorului:</Text>
          </View>
        </View>
        {/* <Text
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} /${totalPages}`
          }
          fixed
        /> */}
      </Page>
    </Document>
  );
};

export default PDFFile;
