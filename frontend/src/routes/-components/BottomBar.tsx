import { default as styles } from '@/BottomBar.module.css'
import { useLocation, Link } from '@tanstack/react-router'
import { menuOptions } from '@/routes/-components/SideBar'
import { clsx } from 'clsx'
import type { FC, SVGProps } from 'react'



interface BottomBarOptionProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  linkTo: string;
}



export default function BottomBar({ visible }: {visible: boolean}) {
  return (
    <div className={clsx(styles['bottom-bar'], !visible && styles['hidden'])}>
      <div className={styles['options-container']}>
        {
          menuOptions.map((option, idx) => {
            return (
              <BottomBarOption key={idx} icon={option.icon} linkTo={option.path} />
            );
          })
        }
      </div>
    </div>
  );
}


function BottomBarOption({ icon: Icon, linkTo }: BottomBarOptionProps) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const linkToRegExp = new RegExp(`^${linkTo}`, 'ig');

  return (
    <Link to={linkTo} >
      <div className={ clsx(styles['bottom-bar-option'], pathname.match(linkToRegExp) && styles['selected']) }>
        <Icon width='25px' height='25px' fill='' />
      </div>
    </Link>
  );
}