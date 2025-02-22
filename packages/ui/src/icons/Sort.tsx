// Copyright  ©, 2023, Lightspark Group, Inc. - All Rights Reserved

import { type PathProps } from "./types.js";

export function Sort({
  strokeWidth = "1.5",
  strokeLinecap = "square",
}: PathProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M1.5 2.5H10.5M4.5 9.5H7.5M3 6H9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
      />
    </svg>
  );
}
