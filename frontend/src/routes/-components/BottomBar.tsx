import { default as styles } from '@/BottomBar.module.css';
import { sideBarOptions as bottomBarOptions } from '@/routes/-components/SideBar';
import { clsx } from 'clsx';
import { FC, SVGProps } from 'react';



export default function BottomBar({ visible }: {visible: boolean}) {
  
  
  return (
    <div className={clsx(styles['bottom-bar'], !visible && styles['hidden'])}>
      <div className={styles['options-container']}>
        {
          bottomBarOptions.map((option: object, idx: number) => {
            return (
              <BottomBarOption key={idx} icon={option.icon}/>
            );
          })
        }
      </div>
    </div>
  );
}


function BottomBarOption({ icon: Icon }: {icon: FC<SVGProps<SVGSVGElement>>}) {
  return (
    <div className={styles['bottom-bar-option']}>
      <Icon width='25px' height='25px' fill='' />
    </div>
  );
}