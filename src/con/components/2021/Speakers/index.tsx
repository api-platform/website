import React, { PropsWithChildren, useContext } from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import Section from '@con/components/common/Section';
import { ConfContext } from '@con/components/layout';
import useSpeakers from '@con/hooks/useSpeakers';
import { Speaker } from 'src/con/types';
import SectionTitle from '@con/components/common/SectionTitle';
import SpeakerCircle from './SpeakerCircle';
import EmptySpeakerCircle from './EmptySpeakerCircle';

interface SpeakersProps extends PropsWithChildren {
  numberVisibles?: number;
}

const Speakers: React.ComponentType<SpeakersProps> = ({ children, numberVisibles = 6 }) => {
  const speakers: Speaker[] = useSpeakers();
  const sortedSpeakers = speakers.sort((a, b) => {
    if (a.number > b.number) return 1;
    if (a.number < b.number) return -1;
    return 0;
  });

  const visibleSpeakers = sortedSpeakers.slice(0, numberVisibles);
  const { edition } = useContext(ConfContext);

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
        <a className="conf__button" href={`/con/${edition}/speakers`}>
          See all our speakers
        </a>
      ) : null}
    </Section>
  );
};

export default Speakers;
