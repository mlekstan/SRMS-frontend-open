import startRentalImg from '@/assets/scooter.png';
import checkScheduleImg from '@/assets/pay-day.png';
import styles from '@/MainBoard.module.css';
import ProfileMenu from '@/ProfileMenu.tsx';



type TileProps = {
  imageSrc: string,
  label: string
}


const tiles = [
  {imgSrc: startRentalImg, label: 'Sprzedaż usługi wypożyczenia'},
  {imgSrc: checkScheduleImg, label: 'Status sprzętu'}
];


function Tile({ imageSrc, label }: TileProps) {
  return (
    <div className={styles['tile']}>
      <div className={styles['img-container']}>
        <img src={imageSrc}></img>
      </div>
      <div className={styles['text-container']}>
        <span>{label}</span>
      </div>
    </div>
  );
}


export default function MainBoard({ profileMenuVisible }) {
  return (
    <div className={styles['main-board']}>
      { profileMenuVisible && <ProfileMenu /> }
      <div className={styles['tiles-container']}>
        {
          tiles.map((tile, idx) => (<Tile key={idx} imageSrc={tile.imgSrc} label={tile.label} />))
        }
      </div>  
    </div>
  );
}


