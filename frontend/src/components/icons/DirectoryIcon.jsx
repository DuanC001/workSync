import React from 'react'
import { SvgIcon } from '@mui/material';

const DirectoryIcon = ({color}) => {
  return (
    <SvgIcon fontSize='small' viewBox="0 0 24 24">
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 4.5C2 2.84315 3.34315 1.5 5 1.5H17C17.5523 1.5 18 1.94772 18 2.5V19.5C18 20.0523 17.5523 20.5 17 20.5H4C2.89543 20.5 2 19.6046 2 18.5V4.5Z"
          stroke={color}
          stroke-width="1.5"
        />
        <path
          d="M2 18.5C2 17.3954 2.89543 16.5 4 16.5H18V19.5C18 20.0523 17.5523 20.5 17 20.5H4C2.89543 20.5 2 19.6046 2 18.5V18.5Z"
          stroke={color}
          stroke-width="1.5"
        />
        <path
          d="M6.70605 5.5H13.2943"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.70605 8.34961H10.4708"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default DirectoryIcon