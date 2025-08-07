import startRentalImg from '@/assets/scooter.png';
import checkScheduleImg from '@/assets/pay-day.png';
import styles from '@/MainBoard.module.css';
import { Link } from '@tanstack/react-router';



type TileProps = {
  imageSrc: string,
  label: string,
  linkTo: string,
}


const tiles = [
  {imgSrc: startRentalImg, label: 'Sprzedaż usługi wypożyczenia', path: '/app/rental/rental-sale'},
  {imgSrc: checkScheduleImg, label: 'Status sprzętu', path: '/app/rental/eq-status'},
];


function Tile({ imageSrc, label, linkTo }: TileProps) {
  return (
    <Link to={linkTo} >
      <div className={styles['tile']}>
        <div className={styles['img-container']}>
          <img src={imageSrc}></img>
        </div>
        <div className={styles['text-container']}>
          <span>{label}</span>
        </div>
      </div>
    </Link>
  );
}


export default function MainBoard() {
  return (
    <div className={styles['main-board']}>
      <div className={styles['tiles-container']}>
        {
          tiles.map((tile, idx) => (<Tile key={idx} imageSrc={tile.imgSrc} label={tile.label} linkTo={tile.path} />))
        }
      </div>  
    </div>
  );
}


