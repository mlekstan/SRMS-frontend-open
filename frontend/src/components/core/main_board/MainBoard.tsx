import { memo } from 'react'
import { Outlet } from '@tanstack/react-router'
import { ThemeProvider } from '@mui/material' 
import { default as theme } from '@/theme';
import styles from '@/components/core/main_board/MainBoard.module.css'


function MainBoard() {
  console.log("render main borad")
  
  return (
    <div className={styles['main-board']}>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>  
    </div>
  );
} 


export default memo(MainBoard);