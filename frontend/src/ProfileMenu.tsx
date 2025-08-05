import { default as styles } from '@/ProfileMenu.module.css';
import UserIcon from '@/assets/user.svg?react';


export default function ProfileMenu() {
  return (
    <div className={styles['profile-menu-wrapper']}>
      <div className={styles['profile-menu']}>
        <span className={styles['branch-name']}>HEXAL I Sosnowiec Kazimierz Górniczy</span>
        <span className={styles['logout']}>Wyloguj się</span>
        <div className={styles['user-img-info-container']}>
          <div className={styles['user-img-container']}>
            <UserIcon width='30px' height='30px' fill='white' />
          </div>
          <div className={styles['user-info-container']}>
            <span className={styles['user-name']}>Michał Lekstan</span>
            <span className={styles['user-login']}>m.lekstan@interia.pl</span>
          </div>
        </div>
      </div>
    </div>
  );
}