"use client";

import { useRouter } from "next/navigation";
import { useBreadcrumb } from "./useBreadcrumb";

export const useBreadcrumbNavigation = () => {
  const router = useRouter();
  const { addBreadcrumb } = useBreadcrumb();

  const navigateWithBreadcrumb = (href: string, label: string) => {
    addBreadcrumb({ label, href });
    router.push(href);
  };

  return { navigateWithBreadcrumb };
};
