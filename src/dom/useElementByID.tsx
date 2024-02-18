import { useCallback, useState } from "react";

import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

interface IElementInfo {
  element?: HTMLElement;
}

/**
 * Extract from the DOM the `HTMLElement` corresponding to the given id. This hook does nothing if the given id is undefined.
 * 
 * @param id The id of the element to extract.
 * @returns The corresponding `HTMLElement` if it exists.
 */
export const useElementByID = (id?: string): IElementInfo => {
  const [element, setElement] = useState<HTMLElement | undefined>();

  const _load = useCallback(() => {
    if (id === undefined) return;

    const element = document.getElementById(id);

    setElement(element ?? undefined);
  }, [id]);

  useIsomorphicLayoutEffect(() => {
    _load();

    return () => {
      // Nothing to do.
    };
  }, [_load]);

  return { element: element };
};
