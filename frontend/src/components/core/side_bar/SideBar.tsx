import { memo } from 'react'
import { clsx } from 'clsx';
import { useLocation, Link } from '@tanstack/react-router';
import RentSignalIcon from '@/assets/menu/rent-signal.svg?react';
import SellIcon from '@/assets/menu/sell.svg?react';
import SettingsIcon from '@/assets/menu/settings.svg?react';
import SquarePlusIcon from '@/assets/menu/square-plus.svg?react';
import styles from '@/components/core/side_bar/SideBar.module.css';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';



interface SideBarOptionProps {
  visible: boolean;
  option: ExtendedLinkOptions; 
};



export const menuOptions: ExtendedLinkOptions[] = [
  { to: "/rental", label: "menu.rentalService", icon: RentSignalIcon },
  { to: "/sale", label: "menu.salesService", icon: SellIcon },
  { to: "/manage", label: "menu.manage", icon: SquarePlusIcon },
  { to: "/settings", label: "menu.settings", icon: SettingsIcon }
]


function SideBarOption({ visible, option }: SideBarOptionProps) {
  const {t} = useTranslationContext()


  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const {to, label, icon: Icon} = option;
  
  const linkToRegExp = new RegExp(`^${to}`, 'ig')
  const cssClassName = clsx(!visible && styles['hidden'], pathname.match(linkToRegExp) && styles['selected']);
  
  return (
    <Link to={to} style={{textDecoration: 'none', color: 'inherit'}}>
      <li className={clsx(styles['side-bar-option'], cssClassName)}>
        <div className={clsx(styles['side-bar-option-icon'], cssClassName)}>
          { Icon && <Icon width='35px' height='35px' fill=''/> }
        </div>
        <div className={clsx(styles['side-bar-option-title'], cssClassName)}>
          <span>{t(label!)}</span>
        </div>
      </li>
    </Link>
  );
}


function SideBar({ visible }: { visible: boolean }) {
  
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