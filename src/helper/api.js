import { API } from "aws-amplify";

export const putTask = async task =>
  await API.put("tasks", "/tasks", {
    body: task
  });

export const delTask = async task =>
   await API.del("tasks", `/tasks/object/1/${task.taskId}`);

export const listTasks = async () => await API.get("tasks", "/tasks/1");

// export const getTask = async taskId => {
//   console.log("calling api");
//   const response = await API.get("tasks", `/tasks/object/${taskId}`);
//   alert(JSON.stringify(response, null, 2));
// };
