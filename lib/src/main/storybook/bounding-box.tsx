import React from 'react';

const stripeSize = 3;

function Base({ isSide }: { isSide?: boolean }) {
  return (
    <div
      style={{
        backgroundImage: `repeating-linear-gradient(
        -55deg,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5) ${stripeSize}px,
        #fff ${stripeSize}px,
        #fff ${stripeSize * 2}px
      )`,
        boxShadow: '0 0 0 5px inset rgba(0, 0, 0, 0.5)',
        display: isSide ? 'inline-block' : 'block',
        height: 50,
        opacity: 0.5,
        width: 50,
      }}
    />
  );
}

export default Base;
