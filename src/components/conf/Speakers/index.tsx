import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import SectionTitle from '../common/SectionTitle';
import SpeakerCircle from './SpeakerCircle';
import Section from '../layout/Section';
import EmptySpeakerCircle from './EmptySpeakerCircle';
import { getSpeakerList } from '../data/api';

const Speakers: React.ComponentType = () => {
  const speakers = getSpeakerList();

  return (
    <Section className="conf__speakers" section="speakers">
      <div className="container">
        <SectionTitle>
          Our <strong>speakers</strong>
        </SectionTitle>
        <p className="conf__section-subtitle">Our speaker list will be communicated soon!</p>
        <Grid>
          {0 === speakers.length ? (
            <>
              <GridItem>
                <EmptySpeakerCircle index={1} />
              </GridItem>
              <GridItem>
                <EmptySpeakerCircle index={2} />
              </GridItem>
              <GridItem>
                <EmptySpeakerCircle index={3} />
              </GridItem>
            </>
          ) : (
            speakers.map((speaker) => (
              <GridItem key={speaker.name}>
                <SpeakerCircle speaker={speaker} />
              </GridItem>
            ))
          )}
        </Grid>
      </div>
    </Section>
  );
};

export default Speakers;
