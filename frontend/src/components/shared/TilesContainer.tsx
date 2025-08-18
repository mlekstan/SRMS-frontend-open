import styles from '@/components/shared/TilesContainer.module.css';
import { Link } from '@tanstack/react-router';



interface TileProps {
  imgSrc: string;
  label: string;
  path: string;
}

type TilesConatainerProps = {
  tiles: TileProps[];
}
  

function Tile({ imgSrc, label, path }: TileProps) {
  return (
    <div className={styles['tile-wrapper']}>
      <Link to={path} >
        <div className={styles['tile']}>
          <div className={styles['img-container']}>
            <img src={imgSrc}></img>
          </div>
          <div className={styles['text-container']}>
            <span>{label}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}


export default function TilesContainer({ tiles }: TilesConatainerProps) {
  return (
    <div className={styles['tiles-container-wrapper']}>
      <div className={styles['tiles-container']}>
        {
          tiles.map((tile, idx) => (<Tile key={idx} imgSrc={tile.imgSrc} label={tile.label} path={tile.path} />))
        }
      </div>
    </div>
  );
}






