import styles from '@/components/shared/TilesContainer.module.css';
import { useTranslationContext } from '@/providers/TranslationContext';
import type { ExtendedLinkOptions } from '@/routes/_app/register';
import { Link } from '@tanstack/react-router';

  

function Tile({ to, label, imgSrc }: ExtendedLinkOptions) {
  const {t} = useTranslationContext();
  
  return (
    <div className={styles['tile-wrapper']}>
      <Link to={to} >
        <div className={styles['tile']}>
          <div className={styles['img-container']}>
            <img src={imgSrc}></img>
          </div>
          <div className={styles['text-container']}>
            <span>{t(label!)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}


export default function TilesContainer({ tiles }: { tiles: ExtendedLinkOptions[] }) {
  return (
    <div className={styles['tiles-container-wrapper']}>
      <div className={styles['tiles-container']}>
        {
          tiles.map((tile, idx) => (<Tile key={idx} to={tile.to} label={tile.label} imgSrc={tile.imgSrc} />))
        }
      </div>
    </div>
  );
}






