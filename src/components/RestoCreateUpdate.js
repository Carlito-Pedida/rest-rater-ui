import { TextField } from "@mui/material";
import React from "react";

const RestoCreateUpdate = ({ RestoName }) => {
  return (
    <>
      <h3>{RestoName}</h3>
      <form>
        <TextField
          className="my-2"
          helperText="Enter restaurant name"
          id="demo-helper-text-misaligned"
          label="Restaurant name"
          InputProps={{
            style: { backgroundColor: "lightgray" }
          }}
        />

        <TextField
          helperText="Enter restaurant description"
          id="demo-helper-text-misaligned"
          label="Description"
          InputProps={{
            style: { backgroundColor: "lightgray", marginTop: "10px" }
          }}
        />
      </form>
    </>
  );
};

export default RestoCreateUpdate;
