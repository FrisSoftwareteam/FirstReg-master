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
    <>
      <div className="px-8 sm:px-10 lg:px-12 py-4 bg-[#F2F2F2]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {/* Back Button - Full width on mobile, auto on larger screens */}
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-primary hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center sm:justify-start py-2 px-3 sm:py-1 sm:px-0 border border-gray-200 rounded-lg sm:border-none"
            disabled={!canGoBack}
          >
            <ArrowBigLeft className="w-5 h-5" />
            <span className="font-medium text-sm sm:text-base">BACK</span>
          </button>

          {/* Breadcrumb Separator - Hidden on mobile */}
          <span className="hidden sm:inline text-gray-400">|</span>

          {/* Breadcrumb Items - Scrollable on mobile */}
          <div className="w-full overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-1 sm:gap-2 min-w-max py-1">
              {breadcrumbs.map((item, index) => (
                <div
                  key={item.href}
                  className="flex items-center gap-1 sm:gap-2"
                >
                  {index > 0 && (
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  )}

                  {index === breadcrumbs.length - 1 ? (
                    // Current page (non-clickable)
                    <span className="text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  ) : (
                    // Previous pages (clickable)
                    <button
                      onClick={() => handleNavigation(item.href, item.label)}
                      className="text-sm sm:text-base text-blue-900 hover:text-blue-700 transition-colors font-medium whitespace-nowrap px-2 py-1 rounded hover:bg-blue-50"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </>
  );
}
