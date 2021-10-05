import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import Layout from '@components/con/2021/layout';
import useSpeakers from '@components/con/2021/hooks/useSpeakers';
import SectionTitle from '@components/con/2021/common/SectionTitle';
import { PageProps } from 'gatsby';
import SpeakerCircle from '@components/con/2021/Speakers/SpeakerCircle';
import ContactCard from '@con/common/ContactCard';

const Conf2021: React.ComponentType<PageProps> = () => {
  const speakers = useSpeakers();

  return (
    <Layout logoAlwaysVisible>
      <div className="conf__speakers-list">
        <div className="container">
          <div className="speakers__header">
            <SectionTitle h1 dark>
              Meet our <strong>speakers</strong>
            </SectionTitle>
            <p className="conf__section-subtitle">
              Join international speakers sharing their knowledge on English-speaking (streamed online) and
              French-speaking tracks.
            </p>
          </div>
          <div className="speakers-list__content">
            <Grid className="speakers-list__grid">
              {speakers.map((speaker) => (
                <GridItem>
                  <SpeakerCircle speaker={speaker} />
                </GridItem>
              ))}
            </Grid>
          </div>
        </div>
      </div>
      <div className="conf__contact">
        <ContactCard />
      </div>
    </Layout>
  );
};

export default Conf2021;
