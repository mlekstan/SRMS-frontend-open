import startRentalImg from '@/assets/bicycles.png';
import checkScheduleImg from '@/assets/delivery-scheduled.png';
import styles from '@/MainBoard.module.css';



type TileProps = {
  imageSrc: string,
  label: string
}


const tiles = [
  {imgSrc: startRentalImg, label: 'Rozpocznij proces wypożycznia-sprzedaży'},
  {imgSrc: checkScheduleImg, label: 'Sprawdź staus sprzętu'}
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


export default function MainBoard() {
  return (
    <div className={styles['main-board']}>
      <div className={styles['tiles-container']}>
        {
          tiles.map((tile, idx) => (<Tile key={idx} imageSrc={tile.imgSrc} label={tile.label} />))
        }
      </div>  
    </div>
  );
}


