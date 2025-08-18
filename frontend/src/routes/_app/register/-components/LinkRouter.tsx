import { Link as RouterLink } from "@tanstack/react-router";
import { Link } from "@mui/material";
import type { LinkProps as RouterLinkProps } from '@tanstack/react-router';
import type { LinkProps } from "@mui/material";


type LinkRouterProps = LinkProps & RouterLinkProps & React.RefAttributes<HTMLAnchorElement>;

export default function LinkRouter(props: LinkRouterProps) {
  return (
    <Link {...props} component={RouterLink as any}/>
  );
}