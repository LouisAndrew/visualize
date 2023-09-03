import Color from "color";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const CONTRAST_RATIO = 0.6;

const getContrastColor = (bgColor: Color) => bgColor.darken(-0.7);

export interface Props {
  color: Color;
  children?: ReactNode;
}

export const ListItem: React.FC<Props> = ({ children, color }) => (
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
