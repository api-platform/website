import React from 'react';
import SectionTitle from '../common/SectionTitle';
import Section from '../common/Section';
import Ventilation from '../images/ventilation.svg';
import Mask from '../images/mask.svg';
import Seats from '../images/seats.svg';
import Capacities from '../images/capacities.svg';

const Covid: React.ComponentType = () => (
  <Section className="conf__covid" section="covid">
    <div className="container">
      <SectionTitle dark>
        <strong>Covid</strong> sanitary measures
      </SectionTitle>
      <p className="conf__section-subtitle">
        With this Con, we are working to give you the best experience. The on-site event will follow the sanitary
        protocols recommended by official health organisations.
      </p>
      <div className="covid__grid">
        <div className="covid__measure">
          <img className="covid__icon" src={Ventilation} alt="ventilation" />
          <div className="covid__content">
            <p>
              The rooms will be naturally <strong>ventilated</strong>
            </p>
          </div>
        </div>
        <div className="covid__measure">
          <img className="covid__icon" src={Capacities} alt="room capacities" />
          <div className="covid__content">
            <p>
              The rooms capacities are <strong>reduced</strong>
            </p>
          </div>
        </div>
        <div className="covid__measure">
          <img className="covid__icon" src={Seats} alt="seats" />
          <div className="covid__content">
            <p>
              <strong>One in two seats</strong> will not be vacant
            </p>
          </div>
        </div>
        <div className="covid__measure">
          <img className="covid__icon" src={Mask} alt="mask" />
          <div className="covid__content">
            <p>
              Wearing a <strong>mask</strong> will be mandatory
            </p>
          </div>
        </div>
      </div>
      <p className="conf__section-subtitle">We will update these recommendations as necessary.</p>
    </div>
  </Section>
);

export default Covid;
