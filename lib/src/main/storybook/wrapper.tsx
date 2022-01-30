import React from 'react';

import BoundingBox from './bounding-box';

const Base = ({ children }: { children: React.ReactNode }) => (
  <section>
    <BoundingBox />
    <BoundingBox isSide />
    {children}
    <BoundingBox isSide />
    <BoundingBox />
  </section>
);

export default Base;
