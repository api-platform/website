import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import useSpeakers from '@con/hooks/useSpeakers';
import SpeakerCircle from '@con/components/2021/Speakers/SpeakerCircle';

const SpeakerList: React.ComponentType = () => {
  const speakers = useSpeakers();

  return (
    <Grid className="speakers-list__grid">
      {speakers.map((speaker) => (
        <GridItem key={speaker.name}>
          <SpeakerCircle speaker={speaker} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default SpeakerList;
