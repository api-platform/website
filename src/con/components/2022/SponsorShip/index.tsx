import React from 'react';
import Section from '@con/components/common/Section';
import { Grid, GridItem } from '@components/common/Grid';
import SectionTitle from '@con/components/common/SectionTitle';
import partners from '@con/data/2021/partners';
import LookingSponsorCard from './LookingSponsorCard';

const SponsorShip: React.ComponentType = () => {
  const filteredPartners = partners.filter((partner) => 5 !== partner.rank);
  return (
    <Section className="conf__sponsoring" section="sponsoring">
      <div className="container">
        <SectionTitle dark>
          <strong>Sponsorship</strong>
        </SectionTitle>
        <LookingSponsorCard />
      </div>
      <div className="conf__bg-white py-200 text-center">
        <div className="container">
          <h3 className="h4 lined text-blue mb-20">They trusted us in 2021</h3>
          <Grid>
            {filteredPartners.map(({ name, logo, link }) => (
              <GridItem key={name} autosize padding={20} className="sponsoring__item">
                <a href={link} title={`${name}`} key={name} target="_blank" rel="nofollow noreferrer noopener">
                  <img width="200" height="200" loading="lazy" src={`/con/2021/partners/${logo}.png`} alt={name} />
                </a>
              </GridItem>
            ))}
          </Grid>
        </div>
      </div>
    </Section>
  );
};

export default SponsorShip;
