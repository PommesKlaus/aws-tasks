import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TasksGroup from "./TasksGroup";
import { tasksGroups } from "../helper/definitions";

function TasksContainer(props) {
  const filteredTasks = status =>
    props.tasks.filter(task => task.status === status);

  return (
    <Grid container>
      {Object.keys(tasksGroups).map(groupKey => (
        <TasksGroup
          key={groupKey}
          tasks={filteredTasks(groupKey)}
          caption={tasksGroups[groupKey]}
          handleUpdateTasks={props.handleUpdateTasks}
          handleTaskEdit={props.handleTaskEdit}
        />
      ))}
    </Grid>
  );
}

TasksContainer.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleUpdateTasks: PropTypes.any.isRequired,
  handleTaskEdit: PropTypes.any.isRequired
};

export default TasksContainer;
