import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./AdminForm.module.css";

function ApproveAdminForm({ admin, setAdmin }) {
  const adminId = useParams();
  console.log(adminId);
  const navigate = useNavigate();

  async function handleApprove() {
    console.log("----------------------------------------------------");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/admins/${adminId.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            approved: true,
          }),
          credentials: "include",
        }
      );
      if (response.ok) {
        const adminInfo = await response.json();
        setAdmin(adminInfo.data.user);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log("----------------------------------------------------");
      console.error("Error fetching admin:", error);
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/admins/${adminId.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        navigate("/admins");
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("Error fetching admin:", error);
    }
  }

  return (
    <>
      <main className={styles.login}>
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="text">Fist Name</label>
            <span>
              {admin.firstName} {admin.lastName}
            </span>
          </div>

          <div className={styles.row}>
            <label htmlFor="text">Email</label>
            <span> {admin.email}</span>
          </div>

          <div className={styles.buttons}>
            {!admin.approved && (
              <button className={styles.updbtn} onClick={handleApprove}>
                Approve
              </button>
            )}
            <button className={styles.delbtn} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default ApproveAdminForm;
