import { memo } from 'react'
import { Outlet } from '@tanstack/react-router'
import styles from '@/components/core/main_board/MainBoard.module.css'


function MainBoard() {
  
  return (
    <div className={styles['main-board']}>
      <Outlet />  
    </div>
  );
} 


export default memo(MainBoard);