/*
Component with state and onClick
*/

import { useState } from 'react';

export type Props = {
  background?: string;
  text?: string;
  onClick: (event: React.MouseEvent) => void;
};

const Base = ({ background, text, onClick }: Props) => {
  // const [buttonActive, setButtonActive] = useState(false);

  return (
    <button
      onClick={onClick}
      css={{
        background: background || 'blue',
        border: 'none',
        borderRadius: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 600,
        padding: '20px 30px',
      }}
    >
      {text || 'Get started'}
    </button>
  );
};

export default Base;
