import React from 'react';

interface TransportProps {
  icon: string;
  title: string;
}

const Transport: React.ComponentType<TransportProps> = ({ icon, title, children }) => (
  <div className="venue__transport">
    <div className="transport__square">
      <span className="transport__title h6 lined lined-dark">{title}</span>
      <div className="transport__icon">
        <img src={icon} alt={title} width={70} height={70} />
      </div>
    </div>
    <div className="transport__content">{children}</div>
  </div>
);

export default Transport;
