import { useCallback, useState } from "react";

import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

interface IElementInfo {
  element?: HTMLElement;
}

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
