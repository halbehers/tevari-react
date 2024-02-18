import { useCallback } from "react";

import { useElementByID } from "./useElementByID";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

type ElementPosition =
  | "static"
  | "relative"
  | "absolute"
  | "fixed"
  | "sticky"
  | "inherit"
  | "initial"
  | "revert"
  | "unset";

export const useSetElementPosition = (id: string, position: ElementPosition = "relative"): void => {
  const { element } = useElementByID(id);

  const _load = useCallback(() => {
    if (element === undefined) return;

    element.style.setProperty("position", position);
  }, [element, position]);

  useIsomorphicLayoutEffect(() => {
    _load();

    return () => {
      // Nothing to do.
    };
  }, [_load]);
};
