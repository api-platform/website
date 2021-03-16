import React from 'react';
import { Grid } from '@components/common/Grid';
import SectionTitle from '../common/SectionTitle';
import prices from '../data/prices';
import PricingCard from './PricingCard';
import Section from '../layout/Section';

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
        </Grid>
      </div>
    </Section>
  );
};

export default Pricing;
