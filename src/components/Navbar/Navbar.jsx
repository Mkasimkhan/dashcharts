import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../assets';
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineMenu } from 'react-icons/ai'
import "./Navbar.css"

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  let navigate = useNavigate();
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize, currentMode } = useStateContext();
  const [navDropDown, setNavDropDown] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/", { replace: true });
  }
  return (
    <>
      <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative" style={{ backgroundColor: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
          <div style={{ position: 'relative' }}>
            <FaUserCircle onClick={() => { setNavDropDown(!navDropDown) }} color={currentColor} className="nav-porfile-icon" />
            <ul className='dashboard-nav-dropdown' style={{ display: navDropDown ? 'block' : 'none', backgroundColor: currentMode === 'Dark' ? 'black' : 'white', color: currentMode === 'Light' ? 'black' : 'white' }}>
              <li onClick={() => { navigate('/profile') }}>My Profile</li>
              <li onClick={logoutHandler}>Logout</li>
            </ul>
          </div>
      </div>
    </>
  );
};

export default Navbar;
