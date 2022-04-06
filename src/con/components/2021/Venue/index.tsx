import React from 'react';
import SectionTitle from '@con/components/common/SectionTitle';
import Section from '@con/components/common/Section';
import Warning from '@con/components/common/Warning';
import Tip from '@con/images/2021/tip.svg';
import PlaneIcon from '@con/images/2021/plane.svg';
import BikeIcon from '@con/images/2021/bike.svg';
import TrainIcon from '@con/images/2021/train.svg';
import CarIcon from '@con/images/2021/car.svg';
import Transport from './Transport';
import Place from './Place';

const Venue: React.ComponentType<{ subtitle: string }> = ({ subtitle }) => (
  <Section className="conf__venue" section="venue">
    <div className="container">
      <SectionTitle>
        The <strong>venue</strong>
      </SectionTitle>
      <p className="conf__section-subtitle">{subtitle}</p>
      <Place />
      <Warning title="Tip" img={Tip}>
        <p>Once you’re arrived in Lille, we advice you to use public transports or local bike-sharing systems.</p>
      </Warning>
      <div className="venue__transportation">
        <Transport title="By train" icon={TrainIcon}>
          <div className="transport__line">
            <div className="transport__time">30 min</div>
            <div className="transport__from">from Brussels</div>
          </div>
          <div className="transport__line">
            <div className="transport__time">50 min</div>
            <div className="transport__from">from Paris</div>
          </div>
          <div className="transport__line">
            <div className="transport__time">1h30</div>
            <div className="transport__from">from London</div>
          </div>
        </Transport>
        <Transport title="By car" icon={CarIcon}>
          <div className="transport__line">
            <div className="transport__time">2 hours</div>
            <div className="transport__from">from Liège</div>
          </div>
          <div className="transport__line">
            <div className="transport__time">2h30</div>
            <div className="transport__from">from Amsterdam</div>
          </div>
          <div className="transport__line">
            <div className="transport__time">3 hours</div>
            <div className="transport__from">from Köln</div>
          </div>
        </Transport>
        <Transport title="By plane" icon={PlaneIcon}>
          <div className="transport__line">
            <div className="transport__time">3 hours</div>
            <div className="transport__from">from Barcelona</div>
          </div>
          <div className="transport__line">
            <div className="transport__time">4 hours</div>
            <div className="transport__from">from Berlin</div>
          </div>
          <div className="transport__line">
            <div className="transport__time">10 hours</div>
            <div className="transport__from">from New York</div>
          </div>
        </Transport>
        <Transport title="By bike" icon={BikeIcon}>
          <div className="transport__line">
            <div className="transport__time">16 hours</div>
            <div className="transport__from">from Amsterdam</div>
          </div>
          <div className="transport__line">
            <div className="transport__time">92 hours</div>
            <div className="transport__from">from Rome</div>
          </div>
          <a
            href="http://www.parispekinavelo.com/itineraire/zoom.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="transport__line"
          >
            <div className="transport__time">140 days</div>
            <div className="transport__from">from Beijing</div>
          </a>
        </Transport>
      </div>
    </div>
  </Section>
);

export default Venue;
