import { createFileRoute } from '@tanstack/react-router'
import { default as TilesContainer } from '@/TilesContainer'
import addFriendImg from '@/assets/register/add-friend.png'
import addImg from '@/assets/register/add.png'
import drivingLicenseImg from '@/assets/register/driving-license.png'

export const Route = createFileRoute('/_app/register/')({
  component: RouteComponent,
})

const tiles = [
  { imgSrc: addFriendImg, label: 'Zarejestruj klienta', path: '/register/client' },
  { imgSrc: addImg, label: 'Zarejestruj sprzęt', path: '/register/card' },
  { imgSrc: drivingLicenseImg, label: 'Zarejestruj kartę', path: '/register/item' },
]


function RouteComponent() {
  return (
    <TilesContainer tiles={tiles} />
  );
}
