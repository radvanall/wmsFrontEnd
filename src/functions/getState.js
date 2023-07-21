const getState = (state) => {
  if (state === "unvalidated")
    return (
      <>
        {" "}
        {/* <h2>Statut:</h2> */}
        <span
          style={{
            backgroundColor: "#ffaebc",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Nevalidat
        </span>
      </>
    );
  if (state === "validated")
    return (
      <>
        {" "}
        {/* <span>Statut:</span> */}
        <span
          style={{
            backgroundColor: "#b4f8c8",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Validat
        </span>
      </>
    );
  if (state === "inSale")
    return (
      <>
        {" "}
        {/* <span>Statut:</span> */}
        <span
          style={{
            backgroundColor: "#b4f8f5",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          În vânzare
        </span>
      </>
    );
  if (state === "forSale")
    return (
      <>
        {" "}
        {/* <span>Statut:</span> */}
        <span
          style={{
            backgroundColor: "#f8e4b4",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Pentru vânzare
        </span>
      </>
    );
};
export default getState;
