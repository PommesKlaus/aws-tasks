import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TaskItem from "./TaskItem";

const styles = {
  paper: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 24
  },
  typography: {
    marginBottom: 16
  }
};

function TasksGroup(props) {
  const classes = props.classes;
  return (
    <Grid item lg={3} sm={6} xs={12}>
      <Paper className={classes.paper}>
        <Typography className={classes.typography} variant="h4">
          {props.caption}
        </Typography>
        {/* Display sorted List (by duedate) of Tasks for given status */}
        {props.tasks
          .slice()
          .sort((a, b) => {
            const date_a = new Date(a.duedate || 32503593600000) * 1;
            const date_b = new Date(b.duedate || 32503593600000) * 1;
            return date_a - date_b;
          })
          .map(task => (
            <TaskItem
              task={task}
              key={task.taskId}
              handleUpdateTasks={props.handleUpdateTasks}
              handleTaskEdit={props.handleTaskEdit}
            />
          ))}
      </Paper>
    </Grid>
  );
}

TasksGroup.propTypes = {
  tasks: PropTypes.array.isRequired,
  caption: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleUpdateTasks: PropTypes.any.isRequired,
  handleTaskEdit: PropTypes.any.isRequired,
};

export default withStyles(styles)(TasksGroup);
