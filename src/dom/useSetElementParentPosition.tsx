import { useCallback } from "react";

import { useElementParent } from "./useElementParent";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import { IElementStyleProperty } from "./useSetElementPosition";

/**
 * Sets the given stype property to the parent of the element corresponding to the given id.
 *
 * @param id The id of the element.
 * @param property The style property to set on its parent.
 */
export const useSetElementParentStyleProperty = (
  id: string,
  { property, value, priority }: IElementStyleProperty
): void => {
  const { elementParent } = useElementParent(id);

  const _load = useCallback(() => {
    if (elementParent === undefined) return;

    elementParent.style.setProperty(property, value ?? null, priority);
  }, [elementParent, property, value, priority]);

  useIsomorphicLayoutEffect(() => {
    _load();

    return () => {
      // Nothing to do.
    };
  }, [_load]);
};
