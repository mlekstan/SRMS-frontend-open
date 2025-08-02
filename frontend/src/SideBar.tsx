import { useState } from 'react';
import { FC, SVGProps } from 'react';
import { clsx } from 'clsx';
import styles from '@/SideBar.module.css';
import RentSignalIcon from '@/assets/rent-signal.svg?react';
import SellIcon from '@/assets/sell.svg?react';
import SettingsIcon from '@/assets/settings.svg?react';



type SideBarOptionProps = {
  icon: FC<SVGProps<SVGSVGElement>>,
  label: string,
  visible: boolean
}

type SideBarProps = {
  visible: boolean
}


const sideBarOptions = [
  { icon: RentSignalIcon, label: 'Usługa wypożyczenia' },
  { icon: SellIcon, label: 'Usługa sprzedaży' },
  { icon: SettingsIcon, label: 'Ustawienia' }  
];


function SideBarOption({ icon: Icon, label, visible }: SideBarOptionProps) {
  const cssClassName = clsx(styles['side-bar-option-title'], !visible && styles['hidden']);
  
  return (
    <li className={styles['side-bar-option']}>
      <div className={clsx(styles['side-bar-option-icon'], cssClassName)}>
        <Icon width='35px' height='35px' fill=''/>
      </div>
      <div className={clsx(styles['side-bar-option-title'], cssClassName)}>
        <span>{label}</span>
      </div>
    </li>
  );
}


export default function SideBar({ visible }: SideBarProps) {
  const cssClassNames = clsx(styles['side-bar'], !visible && styles['hidden']);
  
  const options = sideBarOptions.map((option, idx) => {
    return <SideBarOption key={idx} icon={option.icon} label={option.label} visible={visible} />;
  });
  
  return (
    <div className={cssClassNames}>
      <ul>
        {options}
      </ul>
    </div>
  );
}