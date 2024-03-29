import { Link } from "react-router-dom";
import styles from "./TrainersForm.module.css";
import { useState } from "react";

function TrainersForm() {
  const [driver, setDriver] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [trainingStartDate, setTrainingStartDate] = useState("");
  const [trainingEndDate, setTrainingEndDate] = useState("");
  const [trainingPassPoint, setTrainingPassPoint] = useState("");
  const [trainingResult, setTrainingResult] = useState("");
  const [checkUp, setCheckUP] = useState("");

  async function handleCreate() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/vehicles`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vehicleType,
            plateNumber,
            moterNumber,
            chanciNumber,
            sideNumber,
            pmServiceTime,
            bmServiceTime,
            others,
          }),
          credentials: "include",
        }
      );
      if (response.ok) {
        const vehicle = await response.json();
        navigate(`/vehicles/${vehicle.data.vehicle._id}`);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    }
  }

  return (
    <main className={styles.login}>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="text">መንጃ ፈቃድ ቁጥር</label>
          <input
            type="text"
            id="licenseNumber"
            onChange={(e) => setDriver(e.target.value)}
            value={driver}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="text">የስልጠናው አይነት</label>
          <input
            type="text"
            id="trainingType"
            onChange={(e) => setTrainingType(e.target.value)}
            value={trainingType}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="text">ስልጠናው የጀመረበት ቀን </label>
          <input
            type="date"
            id="trainingStartDate"
            onChange={(e) => setTrainingStartDate(e.target.value)}
            value={trainingStartDate}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="text">ስልጠና ያለቀበት ቀን</label>
          <input
            type="date"
            id="training End Date"
            onChange={(e) => setTrainingEndDate(e.target.value)}
            value={trainingEndDate}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="text">የስልጠናው ማለፊያ ነጥብ</label>
          <input
            type="text"
            id="idNumber"
            onChange={(e) => setTrainingPassPoint(e.target.value)}
            value={trainingPassPoint}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="text">የተገኘ ውጤት</label>
          <input
            type="text"
            id="trainingResult"
            onChange={(e) => setTrainingResult(e.target.value)}
            value={trainingResult}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="text">ምርመራ</label>
          <input
            type="text"
            id="checkup"
            onChange={(e) => setCheckUp(e.target.value)}
            value={checkUp}
          />
        </div>

        <div>
          <Link className={styles.ctaLink}>Submit</Link>
        </div>
      </form>
    </main>
  );
}

export default TrainersForm;
