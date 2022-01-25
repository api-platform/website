import React from 'react';
import classNames from 'classnames';

interface WarningProps {
  img: string;
  title?: string;
  className?: string;
}

const Warning: React.ComponentType<WarningProps> = ({ img, title, children, className }) => (
  <div className={classNames('conf__warning', className)}>
    <img src={img} alt="tip" width="60" height="60" />
    <div className="warning__content">
      {title ? <p className="h5 lined lined-left">{title}</p> : null}
      <div className="warning__body ">{children}</div>
    </div>
  </div>
);

export default Warning;
