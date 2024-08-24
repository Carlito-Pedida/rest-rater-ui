import React from "react";

const RestoDetails = (props) => {
  const { description } = props;
  return (
    <>
      <div>
        <div>{description}</div>
      </div>
    </>
  );
};

export default RestoDetails;
