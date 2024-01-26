import React from "react";
import styles from "./DriverProfile.module.css";
import { useState } from "react";
import AdminForm from "../components/owner/AdminForm";
import LoggedinNavBar from "../components/LoggedinNavBar";

const res = {
  _id: "659e56282226ac98f1655b20",
  firstName: "leul",
  lastName: "gebre",
  email: "mahimahletmahlet@gmail.com",
  role: "owner",
  verified: true,
  approved: true,
  photo: null,
  __v: 0,
};

function TrainerProfile() {
  return (
    <>
      <LoggedinNavBar />
      <main className={styles.container}>
        <div className={styles.imgholder}>
          <img src="driver.jpg" className={styles.driverImg} />
          <p className={styles.name}>
            {res.firstName} {res.lastName}
          </p>
          <p className={styles.phoneNumber}>{res.role}</p>
        </div>
        <div className={styles.profileSettings}>
          <AdminForm admin={res} />
        </div>
        <div>other display</div>
      </main>
    </>
  );
}

export default TrainerProfile;
