import { useState } from 'react';
import NavBar from '@/NavBar.tsx';
import SideBar from '@/SideBar.tsx';
import MainBoard from '@/MainBoard.tsx';
import BottomBar from '@/BottomBar.tsx';
import '@/App.css'

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
      <MainBoard profileMenuVisible={profileMenuVisible}/>
      <BottomBar visible={menuVisible} />
    </div>
  );
}
