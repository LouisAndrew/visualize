import { SortingAlgorithm } from "@/hooks/useSort";

import { eventBus, EVENTS } from "./event-bus";

export const bubbleSort: SortingAlgorithm = async (array, breakpoint) => {
  let isSorting = true;
  eventBus.once(EVENTS.TERMINATE_SORT, () => {
    isSorting = false;
  });

  const size = array.length;

  for (let i = 0; i < size - 1; i++) {
    eventBus.emit(EVENTS.UPDATE_INDEX_I, i);

    for (let j = 0; j < size - i - 1; j++) {
      eventBus.emit(EVENTS.UPDATE_INDEX_J, j);

      if (!isSorting) {
        throw new Error();
      }

      if (array[j].value > array[j + 1].value) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }

      await breakpoint(array);
    }
  }

  return array;
};
