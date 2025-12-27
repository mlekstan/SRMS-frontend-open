import { default as styles } from '@/components/core/profile_menu/ProfileMenu.module.css';
import UserIcon from '@/assets/navbar/user.svg?react';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/api/apiGet';
import type { User } from '@/api/types';


export default function ProfileMenu() {
  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => apiGet<User>({ url: "users/profile" }),
    staleTime: 1000,
  });
  

  return (
    <div className={styles['profile-menu-wrapper']}>
      {
        (data) &&
        <div className={styles['profile-menu']}>
          <span className={styles['branch-name']}>{ data.branch.name }</span>
          <span className={styles['logout']}>Wyloguj się</span>
          <div className={styles['user-img-info-container']}>
            <div className={styles['user-img-container']}>
              <UserIcon width='30px' height='30px' fill='white' />
            </div>
            <div className={styles['user-info-container']}>
              <span className={styles['user-name']}>{ data.firstName + " " + data.lastName }</span>
              <span className={styles['user-login']}>{ data.email }</span>
            </div>
          </div>
        </div>
      }
    </div>
  );
}