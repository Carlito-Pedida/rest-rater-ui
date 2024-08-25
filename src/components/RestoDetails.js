import React from "react";

const RestoDetails = (props) => {
  const { description, rateSystem } = props;
  return (
    <>
      <div>
        <div>{description}</div>
        <div>{rateSystem}</div>
      </div>
    </>
  );
};

export default RestoDetails;
