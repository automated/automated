import React from 'react';

const stripeSize = 3;

const Base = ({ isSide }: { isSide?: boolean }) => (
  <div
    style={{
      backgroundImage: `repeating-linear-gradient(
        -55deg,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5) ${stripeSize}px,
        #fff ${stripeSize}px,
        #fff ${stripeSize * 2}px
      )`,
      height: 50,
      opacity: 0.5,
      width: 50,
      display: isSide ? 'inline-block' : 'block',
      boxShadow: '0 0 0 5px inset rgba(0, 0, 0, 0.5)',
    }}
  ></div>
);

export default Base;
