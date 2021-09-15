import React, { useEffect } from "react";
import TaskItem from "./TaskItem";

const tasks = [
  {
    name: "Task1",
    date: new Date(),
    completed: false,
  },
  {
    name: "Task2",
    date: new Date(),
    completed: true,
  },
  {
    name: "Task3",
    date: new Date(),
    completed: false,
  },
  {
    name: "Task4",
    date: new Date(),
    completed: false,
  },
];
function TaskList() {
  //   const list = [10, 20, 30, 40];
  //   useEffect(() => {
  //     list.map((value, index, array) => {
  //       console.log(`${value}, ${index}, ${array}`);
  //     });
  //   });
  return (
    <React.Fragment>
      {tasks.map((task) => (
        <TaskItem
          name={task.name}
          date={task.date}
          completed={task.completed}
        />
      ))}
    </React.Fragment>
  );
}

export default TaskList;
