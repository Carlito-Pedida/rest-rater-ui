//import { Button, Stack } from "@mui/material";
import { Box, Button, Stack, Textarea } from "@mui/joy";
import Input from "@mui/joy/Input";
import { useState } from "react";

const RestoCreateUpdate = (props) => {
  const [name, setName] = useState(props.resto);
  const [description, setDescription] = useState(props.resto);
  console.log(props.resto);

  return (
    <>
      <h3>{props.resto}</h3>
      <Box
        sx={{
          py: 1,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap"
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            alert(JSON.stringify(formJson));
          }}
        >
          <Stack spacing={1}>
            <label>Restaurant Name</label>
            <Input
              id="name"
              value={props.name}
              size="md"
              placeholder="Restaurant"
              type="text-field"
              onChange={(evt) => setName(evt.target.value)}
            />
            <label>Write a Review</label>
            <Textarea
              id="description"
              value={props.description}
              minRows={3}
              size="md"
              placeholder="Write a review"
              required
              sx={{ my: 2 }}
              onChange={(evt) => setDescription(evt.target.value)}
            />

            <Button color="success" sx={{ my: 2 }} size="sm" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default RestoCreateUpdate;
