import { useState } from 'react';
import { FC, SVGProps } from 'react';
import { clsx } from 'clsx';
import styles from '@/SideBar.module.css';
import RentSignalIcon from '@/assets/rent-signal.svg?react';
import SellIcon from '@/assets/sell.svg?react';
import SettingsIcon from '@/assets/settings.svg?react';
import { Link } from '@tanstack/react-router';



type SideBarOptionProps = {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  visible: boolean;
  linkTo: string;
}

type SideBarProps = {
  visible: boolean;
}


export const sideBarOptions = [
  { icon: RentSignalIcon, label: 'Usługa wypożyczenia', path: '/rental' },
  { icon: SellIcon, label: 'Usługa sprzedaży', path: '/sale' },
  { icon: SettingsIcon, label: 'Ustawienia', path: '/settings' }  
];


function SideBarOption({ icon: Icon, label, visible, linkTo }: SideBarOptionProps) {
  const cssClassName = clsx(styles['side-bar-option-title'], !visible && styles['hidden']);
  
  return (
    <Link to={linkTo} style={{textDecoration: 'none', color: 'inherit'}}>
      <li className={styles['side-bar-option']}>
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


export default function SideBar({ visible }: SideBarProps) {
  const cssClassNames = clsx(styles['side-bar'], !visible && styles['hidden']);
  
  const options = sideBarOptions.map((option, idx) => {
    return <SideBarOption key={idx} icon={option.icon} label={option.label} visible={visible} linkTo={option.path}/>;
  });
  
  return (
    <aside className={cssClassNames}>
      <ul>
        {options}
      </ul>
    </aside>
  );
}