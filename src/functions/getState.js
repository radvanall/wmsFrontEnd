const getState = (state) => {
  if (state === "unvalidated")
    return (
      <>
        {" "}
        {/* <h2>Statut:</h2> */}
        <div
          style={{
            backgroundColor: "#ffaebc",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Nevalidat
        </div>
      </>
    );
  if (state === "validated")
    return (
      <>
        {" "}
        {/* <div>Statut:</div> */}
        <div
          style={{
            backgroundColor: "#b4f8c8",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Validat
        </div>
      </>
    );
  if (state === "inSale")
    return (
      <>
        {" "}
        {/* <div>Statut:</div> */}
        <div
          style={{
            backgroundColor: "#b4f8f5",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          În vânzare
        </div>
      </>
    );
  if (state === "forSale")
    return (
      <>
        {" "}
        {/* <div>Statut:</div> */}
        <div
          style={{
            backgroundColor: "#f8e4b4",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Pentru vânzare
        </div>
      </>
    );
  if (state === "soldOut")
    return (
      <>
        {" "}
        {/* <div>Statut:</div> */}
        <div
          style={{
            backgroundColor: "#deb1c8",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Stoc epuizat
        </div>
      </>
    );
};
export default getState;
