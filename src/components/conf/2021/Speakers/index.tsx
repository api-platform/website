import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import SectionTitle from '../common/SectionTitle';
import SpeakerCircle from './SpeakerCircle';
import { getSpeakerList } from '../data/api';
import Section from '../layout/Section';

const Speakers: React.ComponentType = () => {
  const speakers = getSpeakerList();
  return (
    <Section className="conf__speakers" section="speakers">
      <div className="container">
        <SectionTitle>
          Our <strong>speakers</strong>
        </SectionTitle>
        <Grid>
          {speakers.map((speaker) => (
            <GridItem key={speaker.name}>
              <SpeakerCircle speaker={speaker} />
            </GridItem>
          ))}
        </Grid>
      </div>
    </Section>
  );
};

export default Speakers;
