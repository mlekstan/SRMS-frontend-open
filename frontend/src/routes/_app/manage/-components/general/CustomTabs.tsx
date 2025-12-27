import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";
import { Box, Tab, Tabs } from "@mui/material";
import { useLocation, useNavigate, type LinkOptions } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export type CustomTabProps = {
  to: LinkOptions["to"],
  name: LangKeys,
}


export function CustomTabs({ props }: { props: CustomTabProps[] }) {
  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const {t} = useTranslationContext();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const newValue = props.findIndex((tab) => tab.to === pathname);
    setTabValue(newValue);
  }, [pathname])  
  

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate({ to: props[newValue].to });
    setTabValue(newValue);
  };


  return (
      <Tabs
        aria-label="basic tabs example" 
        variant="fullWidth" 
        sx={{
          backgroundColor: "AppBar.defaultBg",
          '& .MuiTabs-indicator': {
            backgroundColor: 'primary.light',
            height: 4,
            borderRadius: 2,
          },
          '& .MuiTab-root': {
            color: 'text.primary',
            fontSize: 16,
            fontWeight: 400,
          },
          '& .MuiTab-root.Mui-selected': {
            color: 'primary.light',
          },    
        }}
        value={tabValue}
        onChange={handleChange}
      >
        {
          props.map((tab, idx) => (
            <Tab
              key={idx}
              label={t(tab.name)}
            />
          ))
        }
      </Tabs>
  );
}