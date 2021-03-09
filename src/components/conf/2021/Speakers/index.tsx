import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import SectionTitle from '../common/SectionTitle';
import SpeakerCircle from './SpeakerCircle';
import { getSpeakerList } from '../data/api';

const Speakers: React.ComponentType = () => {
  const speakers = getSpeakerList();

  return (
    <div className="conf__speakers">
      <div className="container">
        <SectionTitle>
          Our <strong>speakers</strong>
        </SectionTitle>
        <Grid>
          {speakers.map((speaker) => (
            <GridItem>
              <SpeakerCircle speaker={speaker} />
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Speakers;
