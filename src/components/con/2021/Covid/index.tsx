import React from 'react';
import SectionTitle from '../common/SectionTitle';
import Section from '../common/Section';
import Ventilation from '../images/ventilation.svg';
import Mask from '../images/mask.svg';
import Mask2 from '../images/mask2.svg';
import Seats from '../images/seats.svg';
import Capacities from '../images/capacities.svg';
import Disinfectant from '../images/disinfectant.svg';

interface CovidMeasureProps {
  icon: string;
  alt: string;
}

const CovidMeasure: React.ComponentType<CovidMeasureProps> = ({ icon, alt, children }) => (
  <div className="covid__measure">
    <img className="covid__icon" src={icon} alt={alt} width={80} height={60} />
    <div className="covid__content">
      <p>{children}</p>
    </div>
  </div>
);

const Covid: React.ComponentType = () => (
  <Section className="conf__covid" section="covid">
    <div className="container">
      <SectionTitle dark>
        <strong>Covid-19</strong> sanitary measures
      </SectionTitle>
      <p className="conf__section-subtitle">
        To allow you to enjoy the conference in the safest conditions, the on-site event will follow the sanitary
        protocols recommended by official health organizations.
      </p>
      <div className="covid__grid">
        <CovidMeasure icon={Ventilation} alt="ventilation">
          The rooms will be naturally <strong>ventilated</strong>
        </CovidMeasure>
        <CovidMeasure icon={Capacities} alt="room capacities">
          The rooms capacities will be <strong>reduced</strong>
        </CovidMeasure>
        <CovidMeasure icon={Mask2} alt="mandatory masks">
          Wearing a <strong>mask</strong> will be mandatory.
        </CovidMeasure>
        <CovidMeasure icon={Seats} alt="seats">
          Only <strong>one in two seats</strong> will be available
        </CovidMeasure>
        <CovidMeasure icon={Disinfectant} alt="disinfectant">
          <strong>Disinfectants</strong> will be provided throughout the conference spaces.
        </CovidMeasure>
        <CovidMeasure icon={Mask} alt="mask">
          Face masks will be given out.
        </CovidMeasure>
      </div>
      <p className="conf__section-subtitle">We will update these recommendations as necessary.</p>
    </div>
  </Section>
);

export default Covid;
