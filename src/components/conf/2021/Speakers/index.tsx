import React from 'react';
import { Grid, GridItem } from '@components/common/Grid';
import SectionTitle from '../common/SectionTitle';
import { Speaker } from '../types';
import SpeakerCircle from './SpeakerCircle';

const speakers: Speaker[] = [
  {
    id: 1,
    name: 'Raoult Didier',
    job: 'Quack doctor',
    twitter: 'aa',
    github: 'aa',
    image: 'https://images.bfmtv.com/p-xlRobUNejgZNPhJwMz9I1eQ9g=/3x7:947x538/375x0/images/-318361.jpg',
  },
  {
    id: 2,
    name: 'Knowles Beyoncé',
    job: 'International singer',
    twitter: 'aa',
    image:
      'https://resize-parismatch.lanmedia.fr/img/var/news/storage/images/paris-match/people-a-z/beyonce-knowles/6057836-4-fre-FR/Beyonce-Knowles.jpg',
  },
  {
    id: 3,
    name: 'Hood Robin',
    job: 'Disney thief',
    twitter: 'aa',
    github: 'aa',
    image: 'https://www.disneyphile.fr/wp-content/uploads/2020/04/robin-des-bois-remake.jpg',
  },
  {
    id: 4,
    name: 'Balkany Patrick',
    job: 'Crook of Levallois-Perret lel ;ezlf ;el f;cel c,el, cecverv lrvn',
    github: 'aa',
    image:
      'https://file1.closermag.fr/var/closermag/storage/images/bio-people/biographie-patrick-balkany-529663/4697057-1-fre-FR/Patrick-Balkany.jpg?alias=exact1024x768_l',
  },
  {
    id: 5,
    name: 'Woody',
    job: 'Cowboy',
    github: 'aa',
    twitter: 'aa',
    image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/06/17/18/toy-story-woody-buzz.jpg',
  },
];

const Speakers: React.ComponentType = () => (
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

export default Speakers;
