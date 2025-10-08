"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowBigLeft, ChevronRight } from "lucide-react";
import { useBreadcrumb } from "../hooks/useBreadcrumb";

export default function Breadcrumb() {
  const { breadcrumbs, addBreadcrumb, goBack, canGoBack } = useBreadcrumb();
  const router = useRouter();
  const pathname = usePathname();

  // Auto-add current page to breadcrumb based on pathname
  React.useEffect(() => {
    const currentPageLabel = getPageLabel(pathname);
    if (currentPageLabel && pathname !== "/dashboard") {
      addBreadcrumb({ label: currentPageLabel, href: pathname });
    }
  }, [pathname, addBreadcrumb]);

  // Simple function to get page label from pathname
  const getPageLabel = (path: string): string => {
    const pathSegments = path.split("/").filter(Boolean);

    if (pathSegments.length === 0) return "";

    const lastSegment = pathSegments[pathSegments.length - 1];

    // Convert kebab-case to uppercase with spaces
    return lastSegment
      .split("-")
      .map((word) => word.toUpperCase())
      .join(" ");
  };

  const handleGoBack = () => {
    goBack();
    const previousItem = breadcrumbs[breadcrumbs.length - 2];
    if (previousItem) {
      router.push(previousItem.href);
    }
  };

  const handleNavigation = (href: string, label: string) => {
    addBreadcrumb({ label, href });
    router.push(href);
  };

  return (
    <div className="flex mx-[28px] items-center gap-4 mb-8">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 text-primary hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!canGoBack}
      >
        <ArrowBigLeft />
        <span className="font-medium">BACK</span>
      </button>

      {/* Breadcrumb Separator */}
      <span className="text-gray-400">|</span>

      {/* Breadcrumb Items */}
      <div className="flex items-center gap-2">
        {breadcrumbs.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}

            {index === breadcrumbs.length - 1 ? (
              // Current page (non-clickable)
              <span className="text-gray-600 font-medium">{item.label}</span>
            ) : (
              // Previous pages (clickable)
              <button
                onClick={() => handleNavigation(item.href, item.label)}
                className="text-blue-900 hover:text-blue-700 transition-colors font-medium"
              >
                {item.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
