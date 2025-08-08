import { createFileRoute } from '@tanstack/react-router'
import TilesContainer from '@/TilesContainer'


export const Route = createFileRoute('/_app/sale/')({
  component: Index,
})

const tiles = [
  {imgSrc: '', label: 'Sprzedaż usługi wypożyczenia', path: '/rental/rental-sale'},
  {imgSrc: '', label: 'Status sprzętu', path: '/rental/equip-status'},
];

function Index() {
  return (
    <TilesContainer tiles={tiles} />
  );
}
