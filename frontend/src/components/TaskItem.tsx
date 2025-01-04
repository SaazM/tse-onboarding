import { useState } from "react";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import { updateTask, type Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = async () => {
    setLoading(true);
    const result = await updateTask({ ...task, isChecked: !task.isChecked });
    if (result.success) {
      setTask(result.data);
      setLoading(false);
    } else {
      alert("update failes");
    }
  };

  let wrapperClass = styles.textContainer;
  if (task.isChecked) {
    wrapperClass += " " + styles.checked;
  }
  return (
    <div className={styles.item}>
      <CheckButton onPress={handleToggleCheck} disabled={isLoading} checked={task.isChecked} />
      <div className={wrapperClass}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
