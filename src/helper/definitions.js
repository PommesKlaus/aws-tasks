export const tasksGroups = {
  OPEN: "Offen",
  FOLLOW_UP: "Wiedervorlage",
  WIP: "In Bearbeitung",
  CLOSED: "Abgeschlossen"
};

export const newTaskTemplate = () => ({
  taskId: "",
  title: "",
  description: "",
  category: "",
  status: "OPEN",
  subtasks: [],
  duedate: ""
});

export const categoryDefinitions = {
  BP: { color: "#2196f3", text: "Betriebsprüfung" },
  TR: { color: "#f44336", text: "Steuererklärung" },
  A: { color: "#ffc107", text: "Admin" },
  Q: { color: "#33c9dc", text: "Anfragen" },
  TP: { color: "#00a152", text: "Verrechnungspreise" },
  R: { color: "#9500ae", text: "Reporting" },
};
