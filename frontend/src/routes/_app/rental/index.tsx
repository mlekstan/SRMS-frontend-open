import { createFileRoute } from '@tanstack/react-router'
import TilesContainer from '@/components/shared/TilesContainer'
import startRentalImg from '@/assets/rental/scooter.png';
import checkScheduleImg from '@/assets/rental/pay-day.png';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';


export const Route = createFileRoute('/_app/rental/')({
  component: Index,
})


const tiles: ExtendedLinkOptions[] = [
  { to: "/rental/rental-sale", label: "rentalService.sale", imgSrc: startRentalImg },
  { to: "/rental/equip-status", label: "rentalService.status", imgSrc: checkScheduleImg }
];

function Index() {
  return <TilesContainer tiles={tiles} />
}
