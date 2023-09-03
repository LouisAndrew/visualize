"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { v4 } from "uuid";

import { arrayOfLength, shuffle } from "@/lib/array";

import { Button } from "../ui/button";

export interface ListProps {
  length: number;
}

export const List: React.FC<ListProps> = ({ length }) => {
  const [items, setItems] = useState(
    arrayOfLength(length).map((value) => ({ value: value, key: v4() })),
  );

  const shuffleItems = () => {
    setItems(shuffle(items));
  };

  return (
    <>
      <div className="buttons">
        <Button onClick={shuffleItems}>Shuffle</Button>
      </div>

      <div className="flex space-x-3" suppressHydrationWarning>
        {items.map(({ value, key }) => (
          <motion.div key={key} className="bg-red-700 p-3" layout>
            {value}
          </motion.div>
        ))}
      </div>
    </>
  );
};
