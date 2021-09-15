import { Paper, Typography, Checkbox } from "@material-ui/core";
import React, { useState } from "react";
function TaskItem(props) {
  const [checked, setChecked] = useState(props.completed);
  return (
    <Paper>
      <Typography variant="h6">{props.name}</Typography>
      <Typography variant="body1" color="textSecondary">
        {props.date.toString()}
      </Typography>
      <Checkbox
        checked={checked}
        onClick={() => {
          setChecked(!checked);
        }}
      ></Checkbox>
    </Paper>
  );
}

export default TaskItem;
