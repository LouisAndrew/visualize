import type Color from "color";
import { motion } from "framer-motion";
import { FC } from "react";

import { Icons } from "../icons";

export interface Props {
  color: Color;
  index?: number;
  children?: React.ReactNode;
}

const CARD_WIDTH = 50;
const CARD_PADDING_LEFT = 12;

export const ListIndex: FC<Props> = ({ color, index, children }) => (
  <motion.div
    className="absolute flex flex-col items-center font-bold"
    style={{ color: color.hex() }}
    initial={{ opacity: 0 }}
    animate={{
      x: (index ?? 0) * (CARD_WIDTH + CARD_PADDING_LEFT),
      opacity: index === undefined ? 0 : 1,
    }}
    transition={{ type: "tween" }}
  >
    <Icons.ArrowUp color={color.hex()} />
    {children}
  </motion.div>
);
