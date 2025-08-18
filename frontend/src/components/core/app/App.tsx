import { useState, useCallback, memo } from 'react';
import NavBar from '@/components/core/nav_bar/NavBar';
import SideBar from '@/components/core/side_bar/SideBar';
import MainBoard from '@/components/core/main_board/MainBoard';
import BottomBar from '@/components/core/bottom_bar/BottomBar';
import ProfileMenu from '@/components/core/profile_menu/ProfileMenu'
import '@/components/core/app/App.css'


export default function App() {
  const [menuVisible, setMenuVisible] = useState(true);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  
  console.log('render')

  // function handleBurgerClick() {
  //   setMenuVisible(!menuVisible);
  // }

  const handleBurgerClick = useCallback(() => {
    setMenuVisible(v => !v);
  }, []);

  const handleProfileClick = useCallback(() => {
    setProfileMenuVisible(v => !v)
  }, [])

  // function handleProfileClick() {
  //   setProfileMenuVisible(!profileMenuVisible);
  // }
  
  return (
    <div className='app-container'>
      <NavBar onBurgerClick={handleBurgerClick} onProfileClick={handleProfileClick} />
      {profileMenuVisible && <ProfileMenu />}
      <SideBar visible={menuVisible} />
      <MainBoard />
      <BottomBar visible={menuVisible} />
    </div>
  );
}
