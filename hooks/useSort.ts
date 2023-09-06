import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import { eventBus, EVENTS } from "@/utils/event-bus";

export type ArrayItem = { value: number };
export type Indices = {
  i?: number;
  j?: number | undefined;
};
export type Breakpoint<T> = (currentValue: T) => Promise<void>;
export type SortingAlgorithm = <T extends ArrayItem>(
  array: T[],
  breakpoint: Breakpoint<T[]>,
) => Promise<T[]>;

type SortOptions = {
  timeout?: number;
};

type State<T> = T;
type SetState<T> = Dispatch<SetStateAction<T>>;
export const SORT_STATE = {
  NONE: "NONE",
  STARTED: "STARTED",
  TERMINATED: "TERMINATED",
} as const;
export type SortState = (typeof SORT_STATE)[keyof typeof SORT_STATE];

export const useSort = <T extends ArrayItem>(
  state: State<T[]>,
  setState: SetState<T[]>,
  algorithm: SortingAlgorithm,
  options?: SortOptions,
) => {
  const [indices, setIndices] = useState<Indices>({
    i: undefined,
    j: undefined,
  });

  const [sortState, setSortState] = useState<SortState>(SORT_STATE.NONE);

  const timeout = options?.timeout ?? 1000;

  const breakpoint: Breakpoint<T[]> = async (currentValue) => {
    setState([...currentValue]);

    await new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const sort = async () => {
    setSortState(SORT_STATE.STARTED);

    try {
      await algorithm(state, breakpoint);
    } catch {
      // noop
    } finally {
      setSortState(SORT_STATE.NONE);
      resetStates();
    }
  };

  const stopSorting = () => {
    if (sortState !== SORT_STATE.TERMINATED) {
      eventBus.emit(EVENTS.TERMINATE_SORT);
      setSortState(SORT_STATE.TERMINATED);
    }
  };

  const resetStates = () => {
    setIndices({
      i: undefined,
      j: undefined,
    });
  };

  useEffect(() => {
    eventBus.on(EVENTS.UPDATE_INDEX_I, (i: number) => {
      setIndices((prev) => ({
        ...prev,
        i,
      }));
    });

    eventBus.on(EVENTS.UPDATE_INDEX_J, (j: number) => {
      setIndices((prev) => ({
        ...prev,
        j,
      }));
    });

    return () => {
      eventBus.off(EVENTS.UPDATE_INDEX_I);
      eventBus.off(EVENTS.UPDATE_INDEX_J);
    };
  }, []);

  return {
    indices,
    sortState,

    sort,
    stopSorting,
  };
};
