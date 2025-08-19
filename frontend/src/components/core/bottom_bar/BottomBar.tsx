import { memo } from 'react';
import { clsx } from 'clsx';
import { useLocation, Link } from '@tanstack/react-router';
import { menuOptions } from '@/components/core/side_bar/SideBar';
import type { MenuOption } from '@/components/core/side_bar/SideBar';
import { default as styles } from '@/components/core/bottom_bar/BottomBar.module.css';



function BottomBar({ visible }: {visible: boolean}) {
  console.log("render bottom")
  
  return (
    <div className={clsx(styles['bottom-bar'], !visible && styles['hidden'])}>
      <div className={styles['options-container']}>
        {
          menuOptions.map((option, idx) => {
            return (
              <BottomBarOption key={idx} option={option} />
            );
          })
        }
      </div>
    </div>
  );
}


function BottomBarOption({ option }: { option: MenuOption }) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const {to, icon: Icon} = option;
  const linkToRegExp = new RegExp(`^${to}`, 'ig');

  return (
    <Link to={to} >
      <div className={ clsx(styles['bottom-bar-option'], pathname.match(linkToRegExp) && styles['selected']) }>
        <Icon width='25px' height='25px' fill='' />
      </div>
    </Link>
  );
}



export default memo(BottomBar);