import React from 'react';
import classnames from 'classnames';

interface SectionTitleProps {
  dark?: boolean;
  lined?: boolean;
}

const SectionTitle: React.ComponentType<SectionTitleProps> = ({ children, dark = false, lined = false }) => (
  <div className={classnames('conf__section-title', { dark })}>
    <h2 className="title__layer">{children}</h2>
    <h2 className={classnames({ lined })}>{children}</h2>
  </div>
);

export default SectionTitle;
