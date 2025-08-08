import { Outlet } from '@tanstack/react-router'
import ProfileMenu from '@/ProfileMenu'
import styles from '@/MainBoard.module.css'


export default function MainBoard({ profileMenuVisible }: {profileMenuVisible: boolean }) {
  return (
    <div className={styles['main-board']}>
      {profileMenuVisible && <ProfileMenu />}
      <Outlet />
    </div>
  );
} 


