// Copyright  ©, 2022, Lightspark Group, Inc. - All Rights Reserved

import { type PathProps } from "./types.js";

export function QuestionCircleStrong({
  strokeWidth = "1.5",
  strokeLinecap = "round",
  strokeLinejoin = "round",
}: PathProps) {
  return (
    <svg
      width="100%"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.50065 5.16634C6.00065 3.66634 8.50065 3.79405 8.50065 5.36055C8.50065 6.46687 7.00065 6.64061 7.00065 7.83301M7.00065 9.66634V9.65967M13.1673 6.99967C13.1673 10.4054 10.4064 13.1663 7.00065 13.1663C3.5949 13.1663 0.833984 10.4054 0.833984 6.99967C0.833984 3.59392 3.5949 0.833008 7.00065 0.833008C10.4064 0.833008 13.1673 3.59392 13.1673 6.99967ZM7.16732 9.66634C7.16732 9.75841 7.09272 9.83301 7.00065 9.83301C6.90858 9.83301 6.83398 9.75841 6.83398 9.66634C6.83398 9.57427 6.90858 9.49967 7.00065 9.49967C7.09272 9.49967 7.16732 9.57427 7.16732 9.66634Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  );
}
