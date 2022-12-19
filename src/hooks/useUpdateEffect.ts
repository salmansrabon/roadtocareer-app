import * as React from "react";

export const useUpdateEffect: typeof React.useEffect = (effect, deps) => {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      return effect();
    }

    isMounted.current = true;
    return undefined;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
