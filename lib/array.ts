export const arrayOfLength = (length: number) =>
  Array.from({ length }, (_, i) => i);

export const swapPosition = <T>(
  array: T[],
  index: number,
  newIndex: number,
) => {
  const temp = array[index];
  array[index] = array[newIndex];
  array[newIndex] = temp;
};

// https://bost.ocks.org/mike/shuffle/
export const shuffle = <T>(array: T[]) => {
  const copy = [...array];
  let length = copy.length;

  while (length) {
    const index = Math.floor(Math.random() * length--);
    swapPosition(copy, length, index);
  }

  return copy;
};
