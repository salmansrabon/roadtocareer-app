import * as React from "react";
import { useHookForm } from "mui-react-hook-form-plus";
import { DeepPartial, useWatch } from "react-hook-form";

import { useUpdateEffect } from "./useUpdateEffect";
import { removeEmptyValues } from "../helpers/misc";

export type SeacrchcallBackFn<T> = (search: T) => void;

export interface SearchListProps<T, ListData> {
  listData: ListData[];
  defaultValues: DeepPartial<T>;
  setFilterRef?: React.Dispatch<React.SetStateAction<Partial<T>>>;
  callBackFn?: SeacrchcallBackFn<T>;
}



export const useSeatchList = <T extends object, ListData>({
  defaultValues,
  callBackFn,
  listData,
  setFilterRef,

}: SearchListProps<T, ListData>) => {
  const [filteredData, setFilteredData] = React.useState<ListData[]>([]);

  React.useEffect(() => {
    if (listData && listData.length !== 0 && filteredData.length === 0) {
      setFilteredData(listData);
    }
  }, [listData, filteredData]);

  const { registerState, control } = useHookForm({
    defaultValues,
  });

  const filterState = useWatch({
    control,
  });

  useUpdateEffect(() => {
    setFilterRef?.(removeEmptyValues(filterState));

    callBackFn?.(filterState as T);
  }, [filterState]);

  return {
    registerState,
    filterState,
    filteredData,
    setFilteredData,
  };
};
