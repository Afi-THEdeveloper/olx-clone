import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/Contexts";
import {getAuth,signOut} from 'firebase/auth'

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const auth = getAuth()
  const handleLogout = ()=>{
    signOut(auth).then(()=>{
      navigate('/login')
    }).catch((err)=>{
      alert(err.message)
    })
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate(user? '/' : '/login')}
          >
            {user ? `Welcome ${user.displayName}` : "Login"}
          </span>
          <hr />
        </div>
        <div>
          {user &&<button onClick={handleLogout}>Logout</button>}
        </div>
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=> navigate('/Create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
