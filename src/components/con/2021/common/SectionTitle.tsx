import React from 'react';
import classnames from 'classnames';

interface SectionTitleProps {
  dark?: boolean;
  lined?: boolean;
  h1?: boolean;
  small?: boolean;
}

const SectionTitle: React.ComponentType<SectionTitleProps> = ({
  children,
  dark = false,
  lined = false,
  h1 = false,
  small = false,
}) => (
  <div className={classnames('conf__section-title', { dark, small })}>
    {h1 ? <h1 className="h2 title__layer">{children}</h1> : <h2 className="title__layer">{children}</h2>}
    <div className={classnames('h2', { lined })}>{children}</div>
  </div>
);

export default SectionTitle;
