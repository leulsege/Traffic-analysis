/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import FiredDisplay from "../components/FiredDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedinNavBar from "../components/LoggedinNavBar";

export default function AppLayout() {
  const [drivers, setDrivers] = useState([]);
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
    // Update the 'page' query parameter
    queryParams.set("page", newPage.toString());

    // Update the URL without triggering a full page reload
    navigate(`?${queryParams.toString()}`);
  };

  useEffect(
    function () {
      async function fetchDrivers() {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_API}/drivers?page=${page}`,
            {
              credentials: "include",
            }
          );
          if (response.ok) {
            const driverList = await response.json();
            setDrivers(driverList.data.drivers);
            setResults(driverList.results);
          } else {
            const errorData = await response.json();
            console.log(errorData);
          }
        } catch (error) {
          console.error("Error fetching driver:", error);
        }
      }
      fetchDrivers();
    },
    [page]
  );

  return (
    <div className={styles.app}>
      <LoggedinNavBar />
      <Sidebar setExDrivers={setDrivers} />
      <FiredDisplay
        drivers={drivers}
        isLoading={isLoading}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        page={page}
        results={results}
      />
    </div>
  );
}
