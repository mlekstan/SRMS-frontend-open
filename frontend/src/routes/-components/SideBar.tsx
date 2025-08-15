import { useLocation } from '@tanstack/react-router'
import type { FC, SVGProps } from 'react';
import { clsx } from 'clsx';
import styles from '@/SideBar.module.css';
import RentSignalIcon from '@/assets/menu/rent-signal.svg?react';
import SellIcon from '@/assets/menu/sell.svg?react';
import SettingsIcon from '@/assets/menu/settings.svg?react';
import SquarePlusIcon from '@/assets/menu/square-plus.svg?react';
import { Link } from '@tanstack/react-router';



interface SideBarOptionProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  visible: boolean;
  linkTo: string;
}

export interface MenuOption {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
}



export const menuOptions: Array<MenuOption> = [
  { icon: RentSignalIcon, label: 'Usługa wypożyczenia', path: '/rental' },
  { icon: SellIcon, label: 'Usługa sprzedaży', path: '/sale' },
  { icon: SquarePlusIcon, label: 'Rejestracja', path: '/register' },
  { icon: SettingsIcon, label: 'Ustawienia', path: '/settings' },
];


function SideBarOption({ icon: Icon, label, visible, linkTo }: SideBarOptionProps) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const linkToRegExp = new RegExp(`^${linkTo}`, 'ig')
  const cssClassName = clsx(!visible && styles['hidden'], pathname.match(linkToRegExp) && styles['selected']);
  
  return (
    <Link to={linkTo} style={{textDecoration: 'none', color: 'inherit'}}>
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


export default function SideBar({ visible }: { visible: boolean }) {
  const cssClassNames = clsx(styles['side-bar'], !visible && styles['hidden']);
  
  const options = menuOptions.map((option, idx) => {
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