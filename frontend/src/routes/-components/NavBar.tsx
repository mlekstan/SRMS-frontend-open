import '@/App.css';
import styles from '@/NavBar.module.css';
import BurgerMenuIcon from '@/assets/navbar/burger-menu.svg?react';
import UserIcon from '@/assets/navbar/user.svg?react';



function BurgerMenu({ onClick }) {
  return (
    <div onClick={onClick} className={styles['menu-icon']}>
      <BurgerMenuIcon width='40px' height='40px' fill='white' />
    </div>
  );
}


export function UserImgContainer({ userImg: UserImg }) {
  return (
    <div className={styles['user-img-container']}>
      <UserImg width='30px' height='30px' fill='white' />
    </div>
  );
}
  

function UserProfile({ onClick }) {
  return (
    <div onClick={onClick} className={styles['user-profile']}>
      <UserImgContainer userImg={UserIcon} />
    </div>
  );
}


export default function NavBar({ onBurgerClick, onProfileClick }) {
  return (
    <nav className={styles['nav-bar']}>
      <div className={styles['menu-section']}>
        <BurgerMenu onClick={onBurgerClick} />
      </div>
      <div className={styles['logo-section']}>
        <img className={styles['logo']} src='https://hexal.com.pl/wp-content/uploads/2025/05/HEXAL-logo.svg'></img>
      </div>
      <div className={styles['nav-section']}>
        <UserProfile onClick={onProfileClick} />
      </div>
    </nav>
  );
}




