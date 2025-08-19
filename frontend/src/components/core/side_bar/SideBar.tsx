import { memo } from 'react'
import { clsx } from 'clsx';
import type { FC, SVGProps } from 'react';
import { useLocation, Link, linkOptions } from '@tanstack/react-router'
import RentSignalIcon from '@/assets/menu/rent-signal.svg?react';
import SellIcon from '@/assets/menu/sell.svg?react';
import SettingsIcon from '@/assets/menu/settings.svg?react';
import SquarePlusIcon from '@/assets/menu/square-plus.svg?react';
import styles from '@/components/core/side_bar/SideBar.module.css';



interface SideBarOptionProps {
  visible: boolean;
  option: MenuOption; 
};

export interface MenuOption {
  to: string;
  label: string;
  icon: FC<SVGProps<SVGSVGElement>>; 
};


export const menuOptions = linkOptions([
  { to: '/rental', label: 'Usługa wypożyczenia', icon: RentSignalIcon },
  { to: '/sale', label: 'Usługa sprzedaży', icon: SellIcon },
  { to: '/register', label: 'Rejestracja', icon: SquarePlusIcon },
  { to: '/settings', label: 'Ustawienia', icon: SettingsIcon },
]);


function SideBarOption({ visible, option }: SideBarOptionProps) {
  
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const {to, label, icon: Icon} = option;
  console.log(`side option ${to}`)
  
  const linkToRegExp = new RegExp(`^${to}`, 'ig')
  const cssClassName = clsx(!visible && styles['hidden'], pathname.match(linkToRegExp) && styles['selected']);
  
  return (
    <Link to={to} style={{textDecoration: 'none', color: 'inherit'}}>
      <li className={clsx(styles['side-bar-option'], cssClassName)}>
        <div className={clsx(styles['side-bar-option-icon'], cssClassName)}>
          <Icon width='35px' height='35px' fill=''/>
        </div>
        <div className={clsx(styles['side-bar-option-title'], cssClassName)}>
          <span>{label}</span>
        </div>
      </li>
    </Link>
  );
}


function SideBar({ visible }: { visible: boolean }) {
  console.log("render side")
  
  const cssClassNames = clsx(styles['side-bar'], !visible && styles['hidden']);
  
  const options = menuOptions.map((option, idx) => {
    return <SideBarOption key={idx} visible={visible} option={option} />;
  });
  
  return (
    <aside className={cssClassNames}>
      <ul>
        {options}
      </ul>
    </aside>
  );
}


export default memo(SideBar);