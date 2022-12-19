import * as React from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = React.useState(initialValue);

  const toggle = React.useCallback(
    (_value?: boolean) => {
      if (_value !== undefined) {
        setValue(_value);
        return;
      }

      setValue((v) => !v);
    },
    [setValue]
  );

  return [value, toggle] as const;
};
