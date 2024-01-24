import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

function Sidebar({ setDrivers, setVehicles }) {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav setDrivers={setDrivers} setVehicles={setVehicles} />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by PSTS
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
