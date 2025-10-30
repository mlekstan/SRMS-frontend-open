import { createFileRoute } from '@tanstack/react-router'
import { default as TilesContainer } from '@/components/shared/TilesContainer'
import addFriendImg from '@/assets/register/add-friend.png'
import addImg from '@/assets/register/add.png'
import drivingLicenseImg from '@/assets/register/driving-license.png'
import subcategoriesImg from '@/assets/register/categories.png'
import branchesImg from '@/assets/register/franchise.png'
import driveType from '@/assets/register/engineering.png'
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions'



export const Route = createFileRoute('/_app/register/')({
  component: RouteComponent,
})


const tiles: ExtendedLinkOptions[] = [
  { to: "/register/client", label: "registration.client", imgSrc: addFriendImg },
  { to: "/register/item", label: "registration.item", imgSrc: addImg },
  { to: "/register/card", label: "registration.card", imgSrc: drivingLicenseImg },
  { to: "/register/subcategory", label: "registration.subcategory", imgSrc: subcategoriesImg },
  { to: "/register/branch", label: "registration.branch", imgSrc: branchesImg },
  { to: "/register/drive-type", label: "registration.driveType", imgSrc: driveType },
]


function RouteComponent() {
  return (
    <TilesContainer tiles={tiles} />
  );
}
