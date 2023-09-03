"use client";

import Color from "color";
import { type FC, useState } from "react";
import { v4 } from "uuid";

import { SORT_STATE, useSort } from "@/hooks/useSort";
import { arrayOfLength, shuffle } from "@/lib/array";
import { bubbleSort } from "@/utils/bubble-sort";

import { Icons } from "../icons";
import { Button } from "../ui/button";
import { ListIndex } from "./list-index";
import { ListItem } from "./list-item";

const colorStart = Color("#dc2626");
const colorEnd = Color("#4338ca");

export interface Props {
  length: number;
}

export const List: FC<Props> = ({ length }) => {
  const [items, setItems] = useState(
    arrayOfLength(length).map((value) => ({ value: value + 1, key: v4() })),
  );
  const { sort, indices, sortState, stopSorting } = useSort(
    items,
    setItems,
    bubbleSort,
  );

  const shuffleItems = () => {
    setItems(shuffle(items));
  };

  const isSorting = sortState !== SORT_STATE.NONE;

  return (
    <>
      <div className="mb-3 space-x-2">
        {isSorting ? (
          <Button
            className="gap-x-2"
            onClick={stopSorting}
            disabled={sortState === SORT_STATE.TERMINATED}
          >
            <Icons.StopCircle size={14} />
            Stop
          </Button>
        ) : (
          <Button className="gap-x-2" onClick={sort}>
            <Icons.ArrowUpDown size={14} />
            Sort
          </Button>
        )}

        <Button
          className="gap-x-2"
          onClick={shuffleItems}
          disabled={isSorting}
          variant="ghost"
        >
          <Icons.Shuffle size={14} />
          Shuffle
        </Button>
      </div>
      <div className="track flex space-x-3">
        {items.map(({ value, key }, index) => (
          <ListItem
            key={key}
            color={colorStart.mix(colorEnd, (1 / items.length) * index)}
          >
            {value}
          </ListItem>
        ))}
      </div>
      <div className="list-track relative flex pl-3">
        <ListIndex color={colorEnd} index={indices.i}>
          I
        </ListIndex>
        <ListIndex color={colorStart} index={indices.j}>
          J
        </ListIndex>
      </div>
    </>
  );
};
