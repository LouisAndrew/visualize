import Color from "color";
import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";

const DARKEN_RATIO = 0.7;

const getContrastColor = (bgColor: Color) => bgColor.darken(DARKEN_RATIO * -1);

export interface Props {
  color: Color;
  children?: ReactNode;
}

export const ListItem: FC<Props> = ({ children, color }) => (
  <motion.div
    className="flex h-[50px] w-[50px] items-center justify-center rounded-lg font-bold"
    style={{
      backgroundColor: color.hex(),
      color: getContrastColor(color).hex(),
    }}
    layout
  >
    {children}
  </motion.div>
);
