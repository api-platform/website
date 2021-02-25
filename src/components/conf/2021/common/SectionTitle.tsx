import React from 'react';

const SectionTitle: React.ComponentType = ({ children }) => (
  <div className="conf__section-title">
    <span>{children}</span>
    <h2>{children}</h2>
  </div>
);

export default SectionTitle;
