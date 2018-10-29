import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RedoIcon from "@material-ui/icons/Redo";
import EditIcon from "@material-ui/icons/Edit";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { categoryDefinitions, tasksGroups } from "../helper/definitions";

const styles = theme => ({
  card: {
    marginBottom: 6,
    "&:hover": {
      boxShadow:
        "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)"
    }
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    cursor: "pointer"
  },
  actions: {
    display: "flex"
  },
  actionButtons: {
    marginLeft: "auto"
  },
  typographyCategory: {
    paddingLeft: 12
  }
});

class TaskItem extends React.Component {
  state = {
    expanded: false,
    processMenuAnchorEl: null
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleProcessMenuClose = () => {
    this.setState({ processMenuAnchorEl: null });
  };

  handleTaskStatusChange = newStatus => {
    this.props.handleUpdateTasks({
      ...this.props.task,
      status: newStatus
    });
    this.handleProcessMenuClose();
  };

  render() {
    const { task, classes } = this.props;
    // const task = this.props.task
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          onClick={this.handleExpandClick}
          avatar={
            <Avatar
              style={{
                backgroundColor: task.category
                  ? categoryDefinitions[task.category].color
                  : "#ffef62"
              }}
            >
              {task.category}
            </Avatar>
          }
          title={this.props.task.title}
          subheader={this.props.task.duedate}
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardActions className={classes.actions} disableActionSpacing>
            <Typography
              variant="overline"
              className={classes.typographyCategory}
            >
              {categoryDefinitions[this.props.task.category]
                ? categoryDefinitions[this.props.task.category].text
                : ""}
            </Typography>
            <div className={classes.actionButtons}>
              <IconButton>
                <EditIcon onClick={() => this.props.handleTaskEdit(task)} />
              </IconButton>
              <IconButton>
                <RedoIcon
                  onClick={evt =>
                    this.setState({ processMenuAnchorEl: evt.target })
                  }
                />
              </IconButton>
              <Menu
                id="process-menu"
                anchorEl={this.state.processMenuAnchorEl}
                open={!!this.state.processMenuAnchorEl}
                onClose={this.handleProcessMenuClose}
              >
                {Object.keys(tasksGroups)
                  .filter(key => key !== this.props.task.status)
                  .map(k => (
                    <MenuItem
                      key={k}
                      onClick={() => this.handleTaskStatusChange(k)}
                    >
                      {tasksGroups[k]}
                    </MenuItem>
                  ))}
              </Menu>
            </div>
          </CardActions>
          <CardContent>
            <Typography paragraph>{this.props.task.description}</Typography>
            {this.props.task.subtasks.map((subtask, idx) => (
              <ExpansionPanel key={this.props.task.taskId + idx}>
                <ExpansionPanelSummary
                  expandIcon={
                    !subtask.description ||
                    subtask.description === "" ? null : (
                      <ExpandMoreIcon />
                    )
                  }
                >
                  <Typography>{subtask.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>{subtask.description}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleUpdateTasks: PropTypes.any.isRequired,
  handleTaskEdit: PropTypes.any.isRequired
};

export default withStyles(styles)(TaskItem);
