import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import SectionTitle from '../common/SectionTitle';
import data from '../data/partners';
import Section from '../common/Section';

const Partners: React.ComponentType = () => (
  <Section className="conf__partners" section="partners">
    <div className="container">
      <SectionTitle>
        Our <strong>partners</strong>
      </SectionTitle>
      <Grid>
        {data.map(({ name, logo, link }) => (
          <GridItem autosize padding={20} className="partners__item">
            <a href={link} title={`${name}`} key={name} target="_blank" rel="nofollow noreferrer noopener">
              <img width="200" height="200" loading="lazy" src={`/conf/partners/${logo}.png`} alt={name} />
              <span className="h6 lined partners__title">{name}</span>
            </a>
          </GridItem>
        ))}
      </Grid>
    </div>
  </Section>
);

export default Partners;
