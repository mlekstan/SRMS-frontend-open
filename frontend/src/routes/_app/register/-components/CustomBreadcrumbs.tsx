import { useLocation } from "@tanstack/react-router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkRouter from "@/routes/_app/register/-components/LinkRouter";



export default function CustomBreadcrumbs({ breadcrumbsOptions }) {
  
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const pathParts = pathname.split('/').slice(1);
  
  return (
    <Breadcrumbs separator='>' >
      {pathParts.map((value, index) => {
        const path = '/' + pathParts.slice(0, index + 1).join('/');
        const breadcrumbsOption = breadcrumbsOptions.find((value) => value.to === path);
        
        const style = (index === pathParts.length - 1) ? {color: 'primary.light', } : {};
        return (
          <LinkRouter {...breadcrumbsOption} sx={style}>{breadcrumbsOption?.label}</LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}
