'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useTabs({tabs, onChange}) {
  const pathname = usePathname();

  const [selectedTabIndex, setSelectedTab] = useState(() => {
    const indexOfTab = tabs.findIndex((tab) => tab.href === pathname);
    return indexOfTab;
  });

  useEffect(() => {
    const indexOfTab = tabs.findIndex((tab) => tab.href === pathname);
    setSelectedTab(indexOfTab);
  }, [pathname])

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      onChange,
      setSelectedTab,
    },
    selectedTab: tabs[selectedTabIndex],
  };
}
