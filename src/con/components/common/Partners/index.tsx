import React, { useContext } from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import Section from '@con/components/common/Section';
import { Partner } from 'src/con/types';
import SectionTitle from '@con/components/common/SectionTitle';
import { ConfContext } from '@con/components/layout';

interface PartnersSectionProps {
  partners: Partner[];
  title: string;
  type: string;
}

const PartnersSection: React.ComponentType<PartnersSectionProps> = ({ partners, title, type }) => {
  const { edition } = useContext(ConfContext);
  return (
    <div className={`partners__section partners__${type}`}>
      <h3 className="h6 lined partners__section-title">{title}</h3>
      <Grid>
        {partners.map(({ name, logo, link }) => (
          <GridItem key={name} autosize padding={20} className="partners__item">
            <a href={link} title={`${name}`} key={name} target="_blank" rel="nofollow noreferrer noopener">
              <img width="200" height="200" loading="lazy" src={`/con/${edition}/partners/${logo}.png`} alt={name} />
            </a>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

interface PartnersProps {
  data: Partner[];
}

const Partners: React.ComponentType<PartnersProps> = ({ data }) => {
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
        {silver.length ? (
          <PartnersSection type="silver" partners={silver} title={`Silver sponsor${1 !== silver.length ? 's' : ''}`} />
        ) : null}
        {bronze.length ? (
          <PartnersSection type="bronze" partners={bronze} title={`Bronze sponsor${1 !== bronze.length ? 's' : ''}`} />
        ) : null}
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
