import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authReducer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { searchByValue } from "../store/productReducer";
import { Tooltip } from "@mui/material";

const Header = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const handleSearch = (e) => {
    dispatch(searchByValue(e.target.value));
  };
  return (
    <div className="header">
      <div className="header_left">
        <Link to="/home" className="header_logo">
          WallDesign
        </Link>
        <Link to="/home" className="home">
          Home
        </Link>
        <Link to="/" className="header_all_paintings">
          All Paintings
        </Link>
      </div>
      <div className="header_right">
        <input
          type="text"
          className="header_search_input"
          placeholder="Search"
          onChange={handleSearch}
        />
        <div className="header_links">
          <Tooltip title={user.user.email}>
            <Link to="/order">
              <AccountCircleIcon
                style={{ fontSize: 25, color: "white", marginLeft: "5px" }}
              />
            </Link>
          </Tooltip>
          <Tooltip title={`cart (${cart.length})`}>
            <Link to="/cart">
              <ShoppingCartIcon
                style={{ fontSize: 25, color: "white", marginLeft: "5px" }}
              />
            </Link>
          </Tooltip>
          <Tooltip title="Logout">
            <button className="logout" onClick={() => dispatch(logout())}>
              <LogoutIcon
                style={{ fontSize: 25, color: "white", marginLeft: "5px" }}
              />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Header;
