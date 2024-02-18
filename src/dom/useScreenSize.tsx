import { useCallback, useState } from "react";

import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

interface IScreenSizeInfo {
  screenWidth: number;
  screenHeight: number;
}

/**
 * This hook gives the width and height size of the screen.
 * It automatically reloads on every resize events from the client window.
 * 
 * @returns The width and height.
 */
export const useScreenSize = (): IScreenSizeInfo => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const _load = useCallback(() => {
    setWidth(window.screen.width ?? 0);
    setHeight(window.screen.height ?? 0);
  }, []);

  useIsomorphicLayoutEffect(() => {
    _load();
    window.addEventListener("resize", _load);

    return () => window.removeEventListener("resize", _load);
  }, [_load]);

  return { screenWidth: width, screenHeight: height };
};
