import { createFileRoute } from '@tanstack/react-router'
import { default as TilesContainer } from '@/components/shared/TilesContainer'
import addFriendImg from '@/assets/register/add-friend.png'
import addImg from '@/assets/register/add.png'
import drivingLicenseImg from '@/assets/register/driving-license.png'
import subcategoriesImg from '@/assets/register/subcategories.png'
import categories from '@/assets/register/categories.png'
import branchesImg from '@/assets/register/franchise.png'
import driveType from '@/assets/register/engineering.png'
import addUser from '@/assets/register/add-user.png'
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions'



export const Route = createFileRoute('/_app/manage/')({
  component: RouteComponent,
})


const tiles: ExtendedLinkOptions[] = [
  { to: "/manage/clients/create", label: "manage.clients", imgSrc: addFriendImg },
  { to: "/manage/items/create", label: "manage.items", imgSrc: addImg },
  { to: "/manage/card", label: "manage.cards", imgSrc: drivingLicenseImg },
  { to: "/manage/category", label: "manage.categories", imgSrc: categories },
  { to: "/manage/subcategory", label: "manage.subcategories", imgSrc: subcategoriesImg },
  { to: "/manage/branches/create", label: "manage.branches", imgSrc: branchesImg },
  { to: "/manage/drive-type", label: "manage.driveTypes", imgSrc: driveType },
  { to: "/manage/users/create", label: "manage.users", imgSrc: addUser },
]


function RouteComponent() {
  return (
    <TilesContainer tiles={tiles} />
  );
}
