import { useCallback, useState } from "react";

import { useElementByID } from "./useElementByID";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

interface ISElementScrollInfo {
  elementScrollTop: number;
  elementScrollRelativeTop: number;
  elementScrollHeight: number;
  elementScrollWidth: number;
  elementScrollLeft: number;
  elementScrollRelativeLeft: number;
}

/**
 * This hook gives all necessary information about scroll position of the element corresponding to the given id.
 * It automatically reloads on every scroll or resize events from the client window.
 * 
 * @param id The id of the concerned element.
 * @returns The scroll information.
 */
export const useElementScroll = (id?: string): ISElementScrollInfo => {
  const { element } = useElementByID(id);
  const [top, setTop] = useState(0);
  const [relativeTop, setRelativeTop] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [relativeLeft, setRelativeLeft] = useState(0);

  const _load = useCallback(() => {
    if (!element) {
      setTop(0);
      setRelativeTop(0);
      setWidth(0);
      setHeight(0);
      setLeft(0);
      return;
    }
    const rect = element.getBoundingClientRect();

    setTop(element.scrollTop);
    setRelativeTop(rect.y);
    setWidth(element.scrollWidth);
    setHeight(element.scrollHeight);
    setLeft(element.scrollLeft);
    setRelativeLeft(rect.x);
  }, [element]);

  useIsomorphicLayoutEffect(() => {
    _load();
    window.addEventListener("scroll", _load);
    window.addEventListener("resize", _load);

    return () => {
      window.removeEventListener("resize", _load);
      window.removeEventListener("scroll", _load);
    };
  }, [_load]);

  return {
    elementScrollTop: top,
    elementScrollRelativeTop: relativeTop,
    elementScrollHeight: height,
    elementScrollWidth: width,
    elementScrollLeft: left,
    elementScrollRelativeLeft: relativeLeft,
  };
};
