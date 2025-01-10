import { User } from "src/api/users";
import styles from "src/components/UserTag.module.css";

export interface UserItemProp {
  user: User;
}

export const UserTag = ({ user: initialUser }: UserItemProp) => {
  if (initialUser === undefined) {
    return (
      <div className={styles.tag}>
        <div className={styles.nameBox}>
          <span className={styles.name}>Not Assigned</span>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.tag}>
      <img className={styles.icon} src="/public/userDefault.svg" alt="Default" />
      <div className={styles.nameBox}>
        <span className={styles.name}>{initialUser.name}</span>
      </div>
    </div>
  );
};
