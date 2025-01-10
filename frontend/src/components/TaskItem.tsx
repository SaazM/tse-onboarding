import { useState } from "react";
import { CheckButton, UserTag } from "src/components";
import styles from "src/components/TaskItem.module.css";

import { updateTask, type Task } from "src/api/tasks";
import { Link } from "react-router-dom";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = () => {
    setLoading(true);
    updateTask({
      ...task,
      isChecked: !task.isChecked,
      assignee: task.assignee?._id,
    }).then((result) => {
      if (result.success) {
        setTask({
          ...task,
          isChecked: !task.isChecked,
          assignee: task.assignee,
        });
        setLoading(false);
        // alert(task.isChecked);
      } else {
        alert("update failes");
      }
    });
  };

  let wrapperClass = styles.textContainer;
  if (task.isChecked) {
    wrapperClass += " " + styles.checked;
  }
  const link = "/task/" + task._id;
  // alert(task.assignee?.name);
  return (
    <div className={styles.item}>
      <CheckButton onPress={handleToggleCheck} disabled={isLoading} checked={task.isChecked} />
      <div className={styles.totWrapper}>
        <div className={wrapperClass}>
          <Link to={link} className={styles.taskLink}>
            <span className={styles.title}>{task.title}</span>
          </Link>
          {task.description && <span className={styles.description}>{task.description}</span>}
        </div>
        <div className={styles.userDiv}>
          <UserTag user={task.assignee!} />
        </div>
      </div>
    </div>
  );
}
