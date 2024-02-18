import { useCallback } from "react";

import { useElementParent } from "./useElementParent";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

export type ElementPosition =
  | "static"
  | "relative"
  | "absolute"
  | "fixed"
  | "sticky"
  | "inherit"
  | "initial"
  | "revert"
  | "unset";

export const useSetElementParentPosition = (id: string, position: ElementPosition = "relative"): void => {
  const { elementParent } = useElementParent(id);

  const _load = useCallback(() => {
    if (elementParent === undefined) return;

    elementParent.style.setProperty("position", position);
  }, [elementParent, position]);

  useIsomorphicLayoutEffect(() => {
    _load();

    return () => {
      // Nothing to do.
    };
  }, [_load]);
};
