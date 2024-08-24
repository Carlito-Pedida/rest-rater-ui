import React from "react";

const RestoDetails = (props) => {
  const { description } = props;
  return (
    <>
      <div>
        <p>{description}</p>
      </div>
    </>
  );
};

export default RestoDetails;
