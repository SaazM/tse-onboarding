import { useEffect, useState } from "react";
import { getAllTasks } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

import type { Task } from "src/api/tasks";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      getAllTasks().then((apiTasks) => {
        if (apiTasks.success) {
          setTasks(apiTasks.data);
        } else {
          alert(apiTasks.error);
        }
      });
    } catch (e) {
      alert(e);
    }
  }, []);

  return (
    <div className={styles.outer}>
      <span className={styles.listTitle}>{title}</span>
      <div className={styles.inner}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id}>
              <TaskItem
                task={{
                  _id: task._id,
                  title: task.title,
                  description: task.description,
                  isChecked: task.isChecked,
                  dateCreated: task.dateCreated,
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
