import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { getTask, Task } from "src/api/tasks";
import { Button, Page, TaskForm, UserTag } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const [task, setTask] = useState<Task>();
  const [found, setFound] = useState<boolean>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const id = useParams().id;
  const handleSubmit = () => {
    setIsEditing(true);
  };

  async function onSubmit() {
    if (task !== undefined) {
      const newTask = await getTask(task._id);
      if (newTask.success) {
        setTask(newTask.data);
      } else {
        alert(newTask.error);
      }
    }
    setIsEditing(false);
  }

  useEffect(() => {
    setFound(false);
    try {
      getTask(id!).then((retTask) => {
        if (retTask.success) {
          setTask(retTask.data);
          setFound(true);
        } else {
          //   alert(retTask.error);
        }
      });
    } catch (e) {
      alert(e);
    }
  }, [id]);
  let status = "Not done";
  if (task?.isChecked) {
    status = "Done";
  }
  let description = task?.description;
  if (task?.description === undefined || task?.description === "") {
    description = "(No description)";
  }

  if (found) {
    if (isEditing) {
      return (
        <Page>
          <Helmet>
            <title>Home | TSE Todos</title>
          </Helmet>
          <TaskForm mode="edit" task={task} onSubmit={onSubmit} />
        </Page>
      );
    } else {
      return (
        <Page>
          <Helmet>
            <title>Home | TSE Todos</title>
          </Helmet>
          <p>
            {/* `<Link>` renders an `<a>` element with a correct `href` attribute
                  but uses the react-router library's client-side routing so the new page
                  loads faster (see https://reactrouter.com/en/main/components/link) */}
            <Link to="/">Back to home</Link>
          </p>
          <div className={styles.titleRow}>
            <div className={styles.titleContainer}>
              <span className={styles.title}>{task?.title}</span>
            </div>
            <Button
              onClick={handleSubmit}
              kind="primary"
              type="button"
              data-testid="task-edit-button"
              label="Edit"
            />
          </div>
          <span className={styles.description}>
            <div className={styles.desContainer}>
              <span className={styles.description}>{description}</span>
            </div>
          </span>
          <div className={styles.desRow}>
            <span className={styles.bold}>{"Asignee"}</span>
            <div className={styles.userContainer}>
              {task?.assignee ? (
                <UserTag user={task.assignee} />
              ) : (
                <span className={styles.assignee}>Not Assigned</span>
              )}
            </div>
          </div>
          <div className={styles.desRow}>
            <span className={styles.bold}>{"Status"}</span>
            <span className={styles.description}>{status}</span>
          </div>
          <div className={styles.desRow}>
            <span className={styles.bold}>{"Date Created"}</span>
            <span className={styles.description}>
              {new Intl.DateTimeFormat().format(task?.dateCreated)}
            </span>
          </div>
        </Page>
      );
    }
  } else {
    return (
      <Page>
        <Helmet>
          <title>Home | TSE Todos</title>
        </Helmet>
        <p>
          {/* `<Link>` renders an `<a>` element with a correct `href` attribute
            but uses the react-router library's client-side routing so the new page
            loads faster (see https://reactrouter.com/en/main/components/link) */}
          <Link to="/">Back to home</Link>
        </p>
        <div className={styles.titleRow}>
          <span className={styles.title}>This task doesn&apos;t exist!</span>
        </div>
      </Page>
    );
  }
}
