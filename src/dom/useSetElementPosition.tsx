import { useCallback } from "react";

import { useElementByID } from "./useElementByID";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

export interface IElementStyleProperty {
  property: string;
  value?: string;
  priority?: string;
}

/**
 * Sets the given stype property to the element corresponding to the given id.
 *
 * @param id The id of the element.
 * @param property The style property to set.
 */
export const useSetElementProperty = (
  id: string,
  { property, value, priority }: IElementStyleProperty
): void => {
  const { element } = useElementByID(id);

  const _load = useCallback(() => {
    if (element === undefined) return;

    element.style.setProperty(property, value ?? null, priority);
  }, [element, property, value, priority]);

  useIsomorphicLayoutEffect(() => {
    _load();

    return () => {
      // Nothing to do.
    };
  }, [_load]);
};
