import React from 'react'
import { SvgIcon } from "@mui/material";

const Search = () => {
  return (
    <SvgIcon>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="11"
          cy="10"
          r="8"
          stroke="#474853"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.5303 16.4697L17 15.9393L15.9393 17L16.4697 17.5303L17.5303 16.4697ZM20.4697 21.5303C20.7626 21.8232 21.2374 21.8232 21.5303 21.5303C21.8232 21.2374 21.8232 20.7626 21.5303 20.4697L20.4697 21.5303ZM16.4697 17.5303L20.4697 21.5303L21.5303 20.4697L17.5303 16.4697L16.4697 17.5303Z"
          fill="#474853"
        />
      </svg>
    </SvgIcon>
  );
}

export default Search