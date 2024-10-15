import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Userprofile } from "../../../statemanagment/UserState";
import Cookies from 'js-cookie'
import axios from "axios";

const cartItems = [{
  "Order": 10,
},]

const UserOptions = () => {
  const [userprofile, setUserprofile] = useRecoilState(Userprofile);

  console.log("User Profle is " + JSON.stringify(userprofile));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (userprofile?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    console.log("Came here in logout");

    axios.get("http://localhost:4000/api/v1/logout")
      .then(() => {
        Cookies.remove('token');
        setUserprofile(null);
        console.log("Logout Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error); // Log any error that occurs
      });
  }


  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="User options"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={userprofile?.avatar?.url || "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
