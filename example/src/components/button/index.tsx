import type React from 'react';

export type Props = {
  background?: string;
  text?: string;
  onClick: (event: React.MouseEvent) => void;
};

function Base({ background, text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        background: background || 'blue',
        border: 'none',
        borderRadius: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 600,
        padding: '20px 30px',
      }}
      type="button"
    >
      {text || 'Get started'}
    </button>
  );
}

export default Base;
