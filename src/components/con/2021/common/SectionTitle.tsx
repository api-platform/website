import React from 'react';
import classnames from 'classnames';

interface SectionTitleProps {
  dark?: boolean;
  lined?: boolean;
  h1?: boolean;
}

const SectionTitle: React.ComponentType<SectionTitleProps> = ({
  children,
  dark = false,
  lined = false,
  h1 = false,
}) => (
  <div className={classnames('conf__section-title', { dark })}>
    {h1 ? <h1 className="h2 title__layer">{children}</h1> : <h2 className="title__layer">{children}</h2>}
    <span className={classnames('h2', { lined })}>{children}</span>
  </div>
);

export default SectionTitle;
