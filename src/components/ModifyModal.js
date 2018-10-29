import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import ConfirmDialog from "./ConfirmDialog";
import { guid } from "../helper/functions";
import { categoryDefinitions, newTaskTemplate } from "../helper/definitions";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    maxWidth: "90%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  textfield: {
    width: "100%"
  },
  formControl: {
    width: "100%"
  },
  deleteButton: {
    marginLeft: "auto"
  },
  actionBar: {
    marginTop: 16
  }
});

class ModifyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: newTaskTemplate()
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = name => evt => {
    const target = evt.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let updatedTask = { ...this.state.task };
    updatedTask[name] = value;
    this.setState({
      task: updatedTask
    });
  };

  handleSubmit = evt => {
    let task = { ...this.state.task };
    // If Task is new: Add a taskId before sending PUT-Request
    if (task.taskId === "") {
      task.taskId = guid();
    }
    this.props.handleUpdateTasks(task);
    this.handleModalClose();
    evt.preventDefault();
  };

  handleDelete = () => {
    this.props.handleDelete(this.props.task);
    this.handleModalClose();
  };

  handleModalClose = () => {
    this.setState({ task: newTaskTemplate() });
    this.props.onClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Modal
        open={this.props.open}
        onClose={this.handleModalClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="h4">Neue Aufgabe anlegen</Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="title"
              label="Bezeichnung"
              value={this.state.task.title}
              onChange={this.handleInputChange("title")}
              margin="normal"
              autoFocus
              className={classes.textfield}
            />

            <TextField
              id="description"
              label="Erläuterung"
              value={this.state.task.description}
              onChange={this.handleInputChange("description")}
              margin="normal"
              multiline
              className={classes.textfield}
            />

            <FormControl margin="normal" className={classes.formControl}>
              <InputLabel htmlFor="category-simple">Kategorie</InputLabel>
              <Select
                value={this.state.task.category}
                onChange={this.handleInputChange("category")}
                inputProps={{
                  name: "category",
                  id: "category-simple"
                }}
              >
                <MenuItem value="">
                  <em>Keine</em>
                </MenuItem>
                {Object.keys(categoryDefinitions).map(catId => (
                  <MenuItem value={catId} key={catId}>
                    {categoryDefinitions[catId].text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="duedate"
              label="Fälligkeit"
              type="date"
              margin="normal"
              className={classes.textfield}
              value={this.state.task.duedate}
              onChange={this.handleInputChange("duedate")}
              InputLabelProps={{
                shrink: true
              }}
            />

            <Grid container className={classes.actionBar} spacing={24}>
              <Grid item style={{ flex: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleSubmit}
                >
                  Speichern
                </Button>
              </Grid>
              {/* Only show Delete-Button if taskId is present */}
              {this.state.task.taskId !== "" && (
                <Grid item>
                  <ConfirmDialog
                    buttonText="Löschen"
                    buttonColor="secondary"
                    title="Wirklich löschen?"
                    handleConfirm={this.handleDelete}
                  />
                </Grid>
              )}
            </Grid>
          </form>
        </div>
      </Modal>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.task !== this.props.task) {
      let updateTask = { ...nextProps.task };
      if (!updateTask.hasOwnProperty("duedate")) {
        updateTask.duedate = "";
      }
      this.setState({ task: updateTask });
    }
  }
}

export default withStyles(styles)(ModifyModal);
