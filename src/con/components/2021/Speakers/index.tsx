import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import Section from '@con/components/common/Section';
import useSpeakers from '@con/hooks/useSpeakers';
import { Speaker } from 'src/con/types';
import SectionTitle from '@con/components/common/SectionTitle';
import SpeakerCircle from './SpeakerCircle';
import EmptySpeakerCircle from './EmptySpeakerCircle';

const Speakers: React.ComponentType = ({ children }) => {
  const speakers: Speaker[] = useSpeakers();
  const visibleSpeakers = speakers.slice(0, 6);

  return (
    <Section className="conf__speakers overflow-hidden relative" section="speakers">
      <div className="container">
        <SectionTitle>
          Our <strong>speakers</strong>
        </SectionTitle>
        {children}
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
