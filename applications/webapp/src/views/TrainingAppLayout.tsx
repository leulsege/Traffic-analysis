/* eslint-disable no-unused-vars */

import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import TrainersDisplay from "../components/TrainersDisplay";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import LoggedinNavBar from "../components/LoggedinNavBar";

export default function TrainingAppLayout() {
  const [trainers, setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Parse the 'page' query parameter to a number, defaulting to 1
  const page = parseInt(queryParams.get("page")) || 1;

  const handleNextPage = () => {
    const nextPage = page + 1;
    updatePage(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(page - 1, 1);
    updatePage(prevPage);
  };

  const updatePage = (newPage) => {
    queryParams.set("page", newPage.toString());

    navigate(`?${queryParams.toString()}`);
  };

  useEffect(
    function () {
      async function fetchTrainings() {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_API}/trainings?page=${page}`,
            {
              credentials: "include",
            }
          );
          if (response.ok) {
            const trainingList = await response.json();
            setTrainers(trainingList.data.trainings);
            setResults(trainingList.results);
          } else {
            const errorData = await response.json();
            console.log(errorData);
          }
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      }
      fetchTrainings();
    },
    [page]
  );

  return (
    <div className={styles.app}>
      <LoggedinNavBar />
      <Sidebar setTrainers={setTrainers} />
      {
        <TrainersDisplay
          trainers={trainers}
          isLoading={isLoading}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          page={page}
          results={results}
        />
      }
    </div>
  );
}
