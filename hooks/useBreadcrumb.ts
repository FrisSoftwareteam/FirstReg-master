"use client";

import { useState, useCallback } from 'react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export const useBreadcrumb = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: "DASHBOARD", href: "/dashboard" }
  ]);

  const addBreadcrumb = useCallback((item: BreadcrumbItem) => {
    setBreadcrumbs(() => {
      // If navigating to dashboard, reset to just dashboard
      if (item.href === "/dashboard") {
        return [{ label: "DASHBOARD", href: "/dashboard" }];
      }

      // Build breadcrumbs from the path hierarchy
      const segments = item.href.split("/").filter(Boolean); // remove empty
      const breadcrumbsArr: BreadcrumbItem[] = [];
      let path = "";
      for (let i = 0; i < segments.length; i++) {
        path += "/" + segments[i];
        let label = segments[i].replace(/-/g, ' ').toUpperCase();
        if (i === 0 && segments[i].toLowerCase() === "dashboard") {
          label = "DASHBOARD";
        }
        breadcrumbsArr.push({ label, href: path });
      }
      return breadcrumbsArr;
    });
  }, []);

  const getVisibleBreadcrumbs = useCallback(() => {
    // Always show the last 3 breadcrumbs
    return breadcrumbs.slice(-3);
  }, [breadcrumbs]);

  const goBack = useCallback(() => {
    setBreadcrumbs(prev => {
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  }, []);

  return {
    breadcrumbs: getVisibleBreadcrumbs(),
    addBreadcrumb,
    goBack,
    canGoBack: breadcrumbs.length > 1
  };
};
