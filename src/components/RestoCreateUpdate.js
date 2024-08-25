import { Box, Button, Stack, Textarea } from "@mui/joy";
import Input from "@mui/joy/Input";
import React, { useState } from "react";
import { API } from "../ApiService";

const RestoCreateUpdate = ({ resto, updateRestoDetail, setEdit }) => {
  const { name, description } = resto;
  const [title, setTitle] = useState(name);
  const [desc, setDesc] = useState(description);

  const updateResto = () => {
    API.updateRestoDetail(resto.id, { name: title, description: desc })
      .then((response) => console.log(response))
      .then((response) => updateRestoDetail(response));
  };
  const handleCancel = () => {
    setEdit(null);
  };

  return (
    <React.Fragment>
      {resto ? (
        <div>
          {resto.id ? <h3>Edit: {title} </h3> : <h3>Add Restaurant</h3>}
          <Box
            sx={{
              py: 1,
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap"
            }}
          >
            <form>
              <Stack spacing={1}>
                <label>Restaurant Name</label>
                <Input
                  id="title"
                  value={title}
                  size="md"
                  placeholder="Restaurant"
                  type="text-field"
                  sx={{ my: 2, p: 2 }}
                  onChange={(evt) => setTitle(evt.target.value)}
                />
                <label>Write a Review</label>
                <Textarea
                  id="desc"
                  value={desc}
                  minRows={3}
                  size="md"
                  placeholder="Write a review"
                  required
                  sx={{ my: 2, p: 2 }}
                  onChange={(evt) => setDesc(evt.target.value)}
                />
                <div className="container justify-contents-center">
                  <Button
                    color="success"
                    sx={{ px: 5, my: 1, mr: 2 }}
                    size="sm"
                    type="submit"
                    onClick={() => updateResto()}
                  >
                    Submit
                  </Button>
                  <Button
                    color="danger"
                    sx={{ px: 5, my: 1 }}
                    size="sm"
                    type="submit"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Stack>
            </form>
          </Box>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default RestoCreateUpdate;
