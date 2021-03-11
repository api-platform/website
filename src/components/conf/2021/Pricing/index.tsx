import React from 'react';
import { Grid } from '@components/common/Grid';
import dayjs from 'dayjs';
import SectionTitle from '../common/SectionTitle';
import prices from '../data/prices';
import PricingCard from './PricingCard';
import Section from '../layout/Section';

const Pricing: React.ComponentType = () => {
  const sortedPrices = prices.sort((a, b) => {
    if (dayjs(a.limitDate).isAfter(dayjs(b.limitDate))) return 1;
    if (dayjs(b.limitDate).isAfter(dayjs(a.limitDate))) return -1;
    return 0;
  });
  const activeIndex = sortedPrices.findIndex((price) => dayjs(price.limitDate).isAfter(dayjs()));

  return (
    <Section className="conf__pricing" section="pricing">
      <div className="container">
        <SectionTitle dark>
          <strong>Pricing</strong>
        </SectionTitle>
        <Grid className={`pricing__active-${activeIndex}`}>
          {sortedPrices.map((price, index) => (
            <PricingCard key={price.id} price={price} active={activeIndex === index} />
          ))}
        </Grid>
      </div>
    </Section>
  );
};

export default Pricing;
