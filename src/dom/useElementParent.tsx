import { useCallback, useState } from "react";

import { useElementByID } from "./useElementByID";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

interface IElementParentInfo {
  elementParent?: HTMLElement;
  elementParentNode?: ParentNode;
}

export const useElementParent = (id?: string): IElementParentInfo => {
  const { element } = useElementByID(id);
  const [parent, setParent] = useState<HTMLElement | undefined>();
  const [parentNode, setParentNode] = useState<ParentNode | undefined>();

  const _load = useCallback(() => {
    if (!element) {
      setParent(undefined);
      return;
    }
    setParent(element.parentElement ?? undefined);
    setParentNode(element.parentNode ?? undefined);
  }, [element]);

  useIsomorphicLayoutEffect(() => {
    _load();

    return () => {
      // Nothing to do.
    };
  }, [_load]);

  return { elementParent: parent, elementParentNode: parentNode };
};
