import { useCallback, useState } from "react";

import { useElementByID } from "./useElementByID";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

interface ISElementSizeInfo {
  elementWidth: number;
  elementHeight: number;
}

export type ElementSizeType = "offset" | "scroll" | "client";

interface IElementSizeOptions {
  type?: ElementSizeType;
}

export const useElementSize = (id?: string, options?: IElementSizeOptions): ISElementSizeInfo => {
  const { type = "offset" } = options ?? {};
  const { element } = useElementByID(id);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const _getWidthByType = useCallback((element: HTMLElement, type: ElementSizeType) => {
    switch (type) {
      case "offset":
        return element.offsetWidth;
      case "client":
        return element.clientWidth;
      case "scroll":
        return element.scrollWidth;
    }
  }, []);
  
  const _getHeightByType = useCallback((element: HTMLElement, type: ElementSizeType) => {
    switch (type) {
      case "offset":
        return element.offsetHeight;
      case "client":
        return element.clientHeight;
      case "scroll":
        return element.scrollHeight;
    }
  }, []);

  const _load = useCallback(() => {
    if (!element) {
      setWidth(0);
      setHeight(0);
      return;
    }

    setWidth(_getWidthByType(element, type));
    setHeight(_getHeightByType(element, type));
  }, [_getHeightByType, _getWidthByType, type, element]);

  useIsomorphicLayoutEffect(() => {
    _load();
    window.addEventListener("resize", _load);

    return () => window.removeEventListener("resize", _load);
  }, [_load]);

  return { elementWidth: width, elementHeight: height };
};
