// import React from "react";

import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  let wrapperClass = styles.textContainer;
  if (task.isChecked) {
    wrapperClass += " " + styles.checked;
  }
  return (
    <div className={styles.item}>
      <CheckButton checked={task.isChecked} />
      <div className={wrapperClass}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
