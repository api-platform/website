import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import Section from '@con/components/common/Section';
import Warning from '@con/components/common/Warning';
import SectionTitle from '@con/components/common/SectionTitle';
import Covid from '@con/images/2021/covid.svg';
import prices from '@con/data/2022/prices';
import PricingCard from '@con/components/common/PricingCard';

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
                Online edition is <strong>free*</strong>
              </p>
              <a className="conf__button small square white" href="mailto:events@les-tilleuls.coop">
                Contact us!
              </a>
              <small>*certificate will be needed</small>
            </div>
          </GridItem>
        </Grid>
        <Warning title="*COVID-19 information" img={Covid} className="pricing__warning mt-100">
          <p>
            Tickets may be refunded if the event has to be cancelled due to the COVID-19 pandemic, or if you are unable
            to attend the event due to this sanitary context.
          </p>
        </Warning>
      </div>
    </Section>
  );
};

export default Pricing;
