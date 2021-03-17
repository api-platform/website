import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import SectionTitle from '../common/SectionTitle';
import prices from '../data/prices';
import PricingCard from './PricingCard';
import Section from '../common/Section';

const Pricing: React.ComponentType = () => {
  return (
    <Section className="conf__pricing" section="pricing">
      <div className="container">
        <SectionTitle dark>
          <strong>Pricing</strong>
        </SectionTitle>
        <Grid>
          {prices.map((price) => (
            <PricingCard key={price.id} price={price} />
          ))}
          <GridItem className="pricing__discount">
            <div className="discount__content dotted-corner">
              <p className="h6 lined lined-white">Web-development student or unemployed developer?</p>
              <p>
                Contact us for <strong>a special discount</strong>.
              </p>
              <a
                className="conf__button small square white"
                href="mailto:events@les-tilleuls.coop"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact us!
              </a>
            </div>
          </GridItem>
        </Grid>
      </div>
    </Section>
  );
};

export default Pricing;
