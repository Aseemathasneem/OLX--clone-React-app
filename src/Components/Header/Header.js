import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
function Header() {
  const {user} = useContext(AuthContext)
  const auth = getAuth();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/login'); // Use useNavigate to navigate to the login page
    } catch (error) {
      console.error('Logout error:', error.message);
      // Handle error if needed
    }
    
  };
  const handleSellButtonClick =()=>{
    navigate('/create');
  }
  const handleLoginClick=()=>{
    navigate('/login')
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
          <span onClick={handleLoginClick}>{user ? `Welcome ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>
        {user && <span onClick={handleLogout}>Logout</span>}
        <div className="sellMenu">
          <SellButton ></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={handleSellButtonClick}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
