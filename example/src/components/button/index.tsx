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
  const [buttonActive, setButtonActive] = useState(false);

  return (
    <button
      onClick={onClick}
      css={{
        padding: '20px 30px',
        borderRadius: 10,
        border: 'none',
        background: background || 'blue',
        color: 'white',
        fontWeight: 600,
        fontSize: 20,
      }}
    >
      {text || 'Get started'}
    </button>
  );
};

export default Base;
