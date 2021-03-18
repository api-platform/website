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
              <p className="discount__title h6 lined lined-white">Student or unemployed developer?</p>
              <p>
                Online edition (English-speaking track) is <strong>free*</strong>
              </p>
              <a className="conf__button small square white" href="mailto:events@les-tilleuls.coop">
                Contact us!
              </a>
              <small>*certificate will be needed</small>
            </div>
          </GridItem>
        </Grid>
      </div>
    </Section>
  );
};

export default Pricing;
