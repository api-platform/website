import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import SectionTitle from '../common/SectionTitle';
import data from '../data/partners';
import Section from '../common/Section';
import { Partner } from '../types';

interface PartnersSectionProps {
  partners: Partner[];
  title: string;
  type: string;
}

const PartnersSection: React.ComponentType<PartnersSectionProps> = ({ partners, title, type }) => (
  <div className={`partners__section partners__${type}`}>
    <h3 className="h6 lined partners__section-title">{title}</h3>
    <Grid>
      {partners.map(({ name, logo, link }) => (
        <GridItem key={name} autosize padding={20} className="partners__item">
          <a href={link} title={`${name}`} key={name} target="_blank" rel="nofollow noreferrer noopener">
            <img width="200" height="200" loading="lazy" src={`/con/2021/partners/${logo}.png`} alt={name} />
          </a>
        </GridItem>
      ))}
    </Grid>
  </div>
);

const Partners: React.ComponentType = () => {
  const gold = data.filter((partner) => 1 === partner.rank);
  const silver = data.filter((partner) => 2 === partner.rank);
  const bronze = data.filter((partner) => 3 === partner.rank);
  const partners = data.filter((partner) => 4 === partner.rank);

  return (
    <Section className="conf__partners" section="partners">
      <div className="container">
        <SectionTitle>
          Our <strong>partners</strong>
        </SectionTitle>
        {gold.length ? (
          <PartnersSection type="gold" partners={gold} title={1 === gold.length ? 'Gold sponsor' : 'Gold sponsors'} />
        ) : null}
        {silver.length ? <PartnersSection type="silver" partners={silver} title="Silver sponsors" /> : null}
        {bronze.length ? <PartnersSection type="bronze" partners={bronze} title="Bronze sponsors" /> : null}
        {partners.length ? <PartnersSection type="partners" partners={partners} title="Partners" /> : null}
        <div className="partners__section">
          <a
            className="conf__button square empty"
            href="mailto:events@les-tilleuls.coop"
            target="_blank"
            rel="noopener noreferrer"
          >
            Become sponsor
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Partners;
