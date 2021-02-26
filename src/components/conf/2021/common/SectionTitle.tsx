import React from 'react';
import classnames from 'classnames';

interface SectionTitleProps {
  dark?: boolean;
}

const SectionTitle: React.ComponentType<SectionTitleProps> = ({ children, dark = false }) => (
  <div className={classnames('conf__section-title', { dark })}>
    <span>{children}</span>
    <h2>{children}</h2>
  </div>
);

export default SectionTitle;
