import { createFileRoute } from '@tanstack/react-router'
import TilesContainer from '@/TilesContainer'
import startRentalImg from '@/assets/rental/scooter.png';
import checkScheduleImg from '@/assets/rental/pay-day.png';


export const Route = createFileRoute('/_app/rental/')({
  component: Index,
})

const tiles = [
  {imgSrc: startRentalImg, label: 'Sprzedaż usługi wypożyczenia', path: '/rental/rental-sale'},
  {imgSrc: checkScheduleImg, label: 'Status sprzętu', path: '/rental/equip-status'},
];

function Index() {
  return <TilesContainer tiles={tiles} />
}
