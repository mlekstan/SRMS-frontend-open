import { createFileRoute } from '@tanstack/react-router'
import { default as TilesContainer } from '@/components/shared/TilesContainer'
import clientImg from '@/assets/manage/client.png'
import garageImg from '@/assets/manage/garage.png'
import drivingLicenseImg from '@/assets/manage/driving-license.png'
import subcategoriesImg from '@/assets/manage/subcategories.png'
import categoriesImg from '@/assets/manage/categories.png'
import branchesImg from '@/assets/manage/franchise.png'
import driveTypeImg from '@/assets/manage/engineering.png'
import teamImg from '@/assets/manage/team.png'
import priceListImg from '@/assets/manage/price-list.png'
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions'



export const Route = createFileRoute('/_app/manage/')({
  component: RouteComponent,
})


const tiles: ExtendedLinkOptions[] = [
  { to: "/manage/clients/create", label: "manage.clients", imgSrc: clientImg },
  { to: "/manage/items/create", label: "manage.items", imgSrc: garageImg },
  { to: "/manage/cards/create", label: "manage.cards", imgSrc: drivingLicenseImg },
  { to: "/manage/categories/create", label: "manage.categories", imgSrc: categoriesImg },
  { to: "/manage/subcategories/create", label: "manage.subcategories", imgSrc: subcategoriesImg },
  { to: "/manage/branches/create", label: "manage.branches", imgSrc: branchesImg },
  { to: "/manage/drive-types/create", label: "manage.driveTypes", imgSrc: driveTypeImg },
  { to: "/manage/users/create", label: "manage.users", imgSrc: teamImg },
  { to: "/manage/price-list", label: "manage.priceList", imgSrc: priceListImg },
]


function RouteComponent() {
  return (
    <TilesContainer tiles={tiles} />
  );
}
