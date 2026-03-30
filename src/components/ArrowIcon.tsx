import React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowIcon = ({ width = 32, height = 12, color = "#000000" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 12" fill="none">
      <Path
        d="M31 6L1 6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <Path
        d="M7 12C7 8.68629 4.31371 6 1 6"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M1 6C4.31371 6 7 3.31371 7 0"
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  );
};

export default ArrowIcon;