import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import SectionTitle from '../common/SectionTitle';
import SpeakerCircle from './SpeakerCircle';
import Section from '../common/Section';
import EmptySpeakerCircle from './EmptySpeakerCircle';
import useSpeakers from '../hooks/useSpeakers';
import { Speaker } from '../types';

const Speakers: React.ComponentType = () => {
  const speakers: Speaker[] = useSpeakers();
  const visibleSpeakers = speakers.slice(0, 6);

  return (
    <Section className="conf__speakers" section="speakers">
      <div className="container">
        <SectionTitle>
          Our <strong>speakers</strong>
        </SectionTitle>
        <p className="conf__section-subtitle">
          Join international speakers sharing their knowledge on English-speaking (streamed online) and French-speaking
          tracks.
        </p>
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
            visibleSpeakers.map((speaker) => (
              <GridItem key={speaker.name}>
                <SpeakerCircle speaker={speaker} />
              </GridItem>
            ))
          )}
        </Grid>
      </div>
      {6 < speakers.length ? (
        <a className="conf__button" href="/con/2021/speakers">
          See all our speakers
        </a>
      ) : null}
    </Section>
  );
};

export default Speakers;
