import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkRouter from "./LinkRouter";
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import type { ExtendedLinkOptions } from "@/types/ExtendedLinkOptions";
import type { SxProps, Theme } from "@mui/material";



export default function CustomBreadcrumbs({ breadcrumbsOptions }: { breadcrumbsOptions: ExtendedLinkOptions[] }) {
  const { t } = useTranslationContext();
  
  return (
    <Breadcrumbs separator=">" sx={{ marginBottom: 8 }}>
      {
        breadcrumbsOptions.map((option, idx) => {
          const style: SxProps<Theme> = (theme) => (
            (idx === breadcrumbsOptions.length - 1) ?
            { color: theme.vars.palette.primary.light } :
            { color: theme.vars.palette.text.primary }
          )

          return (
            <LinkRouter {...option} sx={style}>{t(option?.label!)}</LinkRouter>
          )
        })
      }
    </Breadcrumbs>
  );
}
