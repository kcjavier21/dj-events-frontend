import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/dashboardEvent.module.css";

const DashboardEvent = ({ evt, handleDelete }: any) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <a>
          <FaPencilAlt /> Edit Event
        </a>
      </Link>
      <a className={styles.delete} onClick={() => handleDelete(evt.id)}>
        <FaTimes /> Delete Event
      </a>
    </div>
  );
};

export default DashboardEvent;
