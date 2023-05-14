import React, { useContext } from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import Section from '@con/components/common/Section';
import { Partner } from 'src/con/types';
import SectionTitle from '@con/components/common/SectionTitle';
import { ConfContext } from '@con/components/layout';

interface PartnersProps {
  data: Partner[];
}

const Partners: React.ComponentType<PartnersProps> = ({ data }) => {
  const { edition } = useContext(ConfContext);
  const sponsors = data.filter((s) => 6 > s.rank);
  const partners = data.filter((s) => 6 <= s.rank);
  return (
    <Section className="conf__partners" section="partners">
      <div className="container">
        <SectionTitle>
          Our <strong>partners</strong>
        </SectionTitle>
        <div className="partners__section partners__bronze">
          <Grid>
            {sponsors.map(({ name, logo, link }) => (
              <GridItem key={name} autosize padding={20} className="partners__item">
                <a href={link} title={`${name}`} key={name} target="_blank" rel="nofollow noreferrer noopener">
                  <img
                    width="200"
                    height="200"
                    loading="lazy"
                    src={`/con/${edition}/partners/${logo}.png`}
                    alt={name}
                  />
                </a>
              </GridItem>
            ))}
          </Grid>
        </div>
        <div className="partners__section partners__partners">
          <Grid>
            {partners.map(({ name, logo, link }) => (
              <GridItem key={name} autosize padding={20} className="partners__item">
                <a href={link} title={`${name}`} key={name} target="_blank" rel="nofollow noreferrer noopener">
                  <img
                    width="200"
                    height="200"
                    loading="lazy"
                    src={`/con/${edition}/partners/${logo}.png`}
                    alt={name}
                  />
                </a>
              </GridItem>
            ))}
          </Grid>
        </div>
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
