"use client";

import { useEffect } from "react";

interface ViewTrackerProps {
  type: "blog" | "case-study";
  id: string;
}

export default function ViewTracker({ type, id }: ViewTrackerProps) {
  useEffect(() => {
    // Track view on mount
    const trackView = async () => {
      try {
        // Create a unique key for this content
        const viewKey = `viewed_${type}_${id}`;

        // Check if this content has been viewed before
        const hasViewed = localStorage.getItem(viewKey);

        if (hasViewed) {
          // User has already viewed this content, don't track again
          return;
        }

        const endpoint = type === "blog"
          ? `/api/blogs/${id}/view`
          : `/api/case-studies/${id}/view`;

        const response = await fetch(endpoint, {
          method: "POST",
        });

        if (response.ok) {
          // Mark this content as viewed with timestamp
          localStorage.setItem(viewKey, new Date().toISOString());
        }
      } catch (error) {
        console.error("Failed to track view:", error);
      }
    };

    trackView();
  }, [type, id]);

  return null; // This component doesn't render anything
}
