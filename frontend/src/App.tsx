import { useState } from 'react';
import NavBar from '@/routes/-components/NavBar';
import SideBar from '@/routes/-components/SideBar';
import MainBoard from '@/MainBoard';
import BottomBar from '@/routes/-components/BottomBar';
import '@/App.css'
import { Outlet } from '@tanstack/react-router';

export default function App() {
  const [menuVisible, setMenuVisible] = useState(true);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  function handleBurgerClick() {
    setMenuVisible(!menuVisible);
  }

  function handleProfileClick() {
    setProfileMenuVisible(!profileMenuVisible);
  }
  
  return (
    <div className='app-container'>
      <NavBar onBurgerClick={handleBurgerClick} onProfileClick={handleProfileClick} />
      <SideBar visible={menuVisible} />
      <Outlet />
      {/* <MainBoard profileMenuVisible={profileMenuVisible}/> */}
      <BottomBar visible={menuVisible} />
    </div>
  );
}
