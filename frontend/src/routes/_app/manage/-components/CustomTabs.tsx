import { useTranslationContext } from "@/providers/TranslationContext";
import type { LangKeys } from "@/providers/TranslationProvider";
import { Tab, Tabs } from "@mui/material";
import { useLocation, useNavigate, type LinkOptions } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export type CustomTabProps = {
  to: LinkOptions["to"],
  tabName: LangKeys,
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
        '& .MuiTabs-indicator': {
          backgroundColor: 'primary.main',
          height: 4,
          borderRadius: 2,
        },
        '& .MuiTab-root': {
          color: 'text.primary',
          fontSize: 16,
          fontWeight: 400,
        },
        '& .Mui-selected': {
          color: 'primary.main',
        },       
      }}
      value={tabValue}
      onChange={handleChange}
    >
      {
        props.map((tab, idx) => (
          <Tab
            key={idx}
            label={t(tab.tabName)}
          />
        ))
      }
    </Tabs>
  );
}