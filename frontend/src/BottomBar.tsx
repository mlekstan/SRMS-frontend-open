import { default as styles } from '@/BottomBar.module.css';
import { sideBarOptions as bottomBarOptions } from '@/SideBar.tsx';
import { clsx } from 'clsx';



export default function BottomBar({ visible }) {
  
  
  return (
    <div className={clsx(styles['bottom-bar'], !visible && styles['hidden'])}>
      <div className={styles['options-container']}>
        {
          bottomBarOptions.map((option, idx) => {
            return (
              <BottomBarOption key={idx} icon={option.icon}/>
            );
          })
        }
      </div>
    </div>
  );
}


function BottomBarOption({ icon: Icon }) {
  return (
    <div className={styles['bottom-bar-option']}>
      <Icon width='25px' height='25px' fill='' />
    </div>
  );
}