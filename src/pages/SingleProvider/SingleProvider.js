import React from "react";
import { useParams } from "react-router-dom";
const SingleProvider = () => {
  const { providerId } = useParams();
  console.log(providerId);
  return <div>SingleProvider</div>;
};

export default SingleProvider;
