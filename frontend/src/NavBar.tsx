import { useState} from 'react';
import '@/App.css';
import styles from '@/NavBar.module.css';
import BurgerMenuIcon from '@/assets/burger-menu.svg?react';



function BurgerMenu({ onClick }) {

  return (
    <div onClick={onClick} className={styles['menu-icon']}>
      <BurgerMenuIcon width='40px' height='40px' fill='white' />
    </div>
  );
}


function UserProfile() {
 
  return (
    <div className={styles['user-profile']}>
      <div className={styles['user-info']}>
        <span className={styles['user-first-name']}>Michał</span>
        <span className={styles['user-second-name']}>Lekstan</span>
      </div>
      <div className={styles['user-img']}></div>
    </div>
  )
}


export default function NavBar({ onBurgerClick }) {
  
  return (
    <nav className={styles['nav-bar']}>
      <div className={styles['menu-section']}>
        <BurgerMenu onClick={onBurgerClick} />
      </div>
      <div className={styles['logo-section']}>
        <img className={styles['logo']} src='https://hexal.com.pl/wp-content/uploads/2025/05/HEXAL-logo.svg'></img>
      </div>
      <div className={styles['nav-section']}>
        <UserProfile />
      </div>
    </nav>
  )
}




