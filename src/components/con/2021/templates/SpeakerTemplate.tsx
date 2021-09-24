import React from 'react';
import Layout from '@components/con/2021/layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import SectionTitle from '@components/con/2021/common/SectionTitle';
import { PageProps, useStaticQuery, graphql } from 'gatsby';
import { convertTime } from '../utils';
import Button from '../common/Button';
import { Conference, Speaker } from '../types';
import SpeakerSocialList from '../Speakers/SpeakerSocialList';
import useConferences from '../hooks/useConferences';
import tracks from '../data/tracks';

export const SpeakerConferenceSlot: React.ComponentType<{ conference: Conference }> = ({ conference }) => {
  const track = tracks.find((t) => t.id === conference.track);
  const { start, end, title, slug, short } = conference;
  return (
    <div className="speaker__conference-slot dotted-corner">
      <div className="conference__track">
        <span className="h6">{`Track #${track.id}`}</span>
        <span className="overline">{track.type}</span>
      </div>
      <div className="conference__content">
        <span className="overline">
          {start && end ? `Sep, 10 2021 · ${convertTime(start)} - ${convertTime(end)}` : 'Sep, 10 2021'}
        </span>
        <h3 className="h6 lined lined-left">{title}</h3>
        <p>{short}</p>
        <Button className="square" size="small" to={slug}>
          See details
        </Button>
      </div>
    </div>
  );
};

interface SpeakerTemplateProps extends PageProps {
  pageContext: Speaker;
}

const SpeakerTemplate: React.ComponentType<SpeakerTemplateProps> = ({ pageContext, location }) => {
  const { id, name, job, description } = pageContext;
  const conferences = useConferences(id);
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "speakersImages" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 400, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  `);
  const image = getImage(data.allFile.nodes.find((imageData) => imageData.name === id));
  const firstname = name.split(' ')[0];

  return (
    <Layout location={location}>
      <div className="conf__speaker-profile">
        <div className="speaker__header">
          <SectionTitle dark lined h1>
            <strong>{name}</strong>
          </SectionTitle>
          <div className="overline speaker__job">{job}</div>
        </div>
        <div className="container">
          <div className="speaker__about">
            <div className="speaker__picture">
              <div className="circle__effect">
                <GatsbyImage image={image} className="circle__picture" alt={name} />
              </div>
            </div>
            <div className="speaker__details">
              <div dangerouslySetInnerHTML={{ __html: description }} />
              <SpeakerSocialList speaker={pageContext} />
            </div>
            {0 < conferences.length ? (
              <div className="speaker__schedule">
                <h2 className="schedule__title h5">{`${firstname}'s schedule`}</h2>
                {conferences.map((conference) => (
                  <SpeakerConferenceSlot conference={conference} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpeakerTemplate;
