import { useCallback, useState } from "react";

import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

interface IScreenSizeInfo {
  screenWidth: number;
  screenHeight: number;
}

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
