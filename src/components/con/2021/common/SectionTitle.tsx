import React from 'react';
import classnames from 'classnames';

interface SectionTitleProps {
  dark?: boolean;
}

const SectionTitle: React.ComponentType<SectionTitleProps> = ({ children, dark = false }) => (
  <div className={classnames('conf__section-title', { dark })}>
    <h2 className="title__layer">{children}</h2>
    <h2>{children}</h2>
  </div>
);

export default SectionTitle;
