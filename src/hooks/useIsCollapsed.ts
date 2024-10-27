"use client";

import { useEffect, useState } from "react";

import useLocalStorage from "./useLocalStorage";

export default function useIsCollapsed() {
  const [isCollapsed, setIsCollapsed] = useLocalStorage({
    key: "collapsed-sidebar",
    defaultValue: false,
  });
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Initial setup
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth !== null) {
      setIsCollapsed(windowWidth < 768 ? false : isCollapsed);
    }
  }, [windowWidth, isCollapsed, setIsCollapsed]);

  return [isCollapsed, setIsCollapsed] as const;
}
