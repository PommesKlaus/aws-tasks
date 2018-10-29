import React, { Component } from "react";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import "typeface-roboto";
import ModifyModal from "./components/ModifyModal";
import TasksContainer from "./components/TasksContainer";
import { listTasks, putTask, delTask } from "./helper/api";
import { newTaskTemplate } from "./helper/definitions";
import "./App.css";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modifyModalOpen: false,
      editTask: newTaskTemplate(),
      tasks: []
    };
  }

  updateTask = updatedTask => {
    putTask(updatedTask)
      .then(res => {
        if (res.error) {
          console.error(res.error);
        } else {
          this.setState({
            tasks: this.state.tasks
              .filter(t => t.taskId !== updatedTask.taskId)
              .concat(updatedTask)
          });
        }
      })
      .catch(err => console.error(err));
  };

  deleteTask = task => {
    delTask(task)
      .then(res => {
        if (res.error) {
          console.error(res.error);
        } else {
          this.setState({
            tasks: this.state.tasks.filter(t => t.taskId !== task.taskId)
          });
        }
      })
      .catch(err => console.error(err));
  };

  editTask = task => {
    this.setState({
      editTask: task,
      modifyModalOpen: true
    });
  };

  render() {
    return (
      <div className="App">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.loading}
          message={<span id="message-id">Loading...</span>}
        />

        <TasksContainer
          tasks={this.state.tasks}
          handleUpdateTasks={this.updateTask}
          handleTaskEdit={this.editTask}
        />

        <Button
          style={{ position: "fixed", bottom: 20, right: 12 }}
          color="primary"
          variant="fab"
          onClick={() => this.editTask(newTaskTemplate())}
        >
          <AddIcon />
        </Button>

        <ModifyModal
          open={this.state.modifyModalOpen}
          onClose={() =>
            this.setState({
              modifyModalOpen: false,
              editTask: newTaskTemplate()
            })
          }
          handleUpdateTasks={this.updateTask}
          handleDelete={this.deleteTask}
          task={this.state.editTask}
        />
      </div>
    );
  }

  componentDidMount() {
    listTasks()
      .then(res => {
        this.setState({
          tasks: res,
          loading: false
        });
      })
      .catch(err => console.error(err));
  }
}

export default withAuthenticator(App, true);
