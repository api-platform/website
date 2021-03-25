import React from 'react';
import Layout from '@components/con/2021/layout';
import SectionTitle from '@components/con/2021/common/SectionTitle';
import { PageProps, useStaticQuery, graphql } from 'gatsby';
import dayjs from 'dayjs';
import { getTrack } from '../data/api';
import Button from '../common/Button';
import { Conference, Speaker } from '../types';
import SpeakerSocialList from '../Speakers/SpeakerSocialList';

const SpeakerConferenceSlot: React.ComponentType<{ conference: Conference }> = ({ conference }) => {
  const track = getTrack(conference.track);

  const convertTime = (timeRange: string[]) => {
    if (2 > timeRange.length) return 'invalid time range';
    const startTimeParts = timeRange[0].split(':');
    const endTimeParts = timeRange[1].split(':');
    const startDate = dayjs()
      .set('hour', parseInt(startTimeParts?.[0], 10))
      .set('minute', parseInt(startTimeParts?.[1], 10))
      .format('LT');
    const endDate = dayjs()
      .set('hour', parseInt(endTimeParts?.[0], 10))
      .set('minute', parseInt(endTimeParts?.[1], 10))
      .format('LT');
    return `${startDate} - ${endDate}`;
  };

  return (
    <div className="speaker__conference dotted-corner">
      <div className="conference__track">
        <span className="h6">{`Track #${track.index}`}</span>
        <span className="overline">{track.type}</span>
      </div>
      <div className="conference__content">
        <span className="overline">{convertTime([conference.start, conference.end])}</span>
        <h3 className="h5 lined lined-left">{conference.title}</h3>
        <p>{conference.short}</p>
        <Button className="square" size="small" to={conference.slug}>
          See details
        </Button>
      </div>
    </div>
  );
};

interface ConferenceTemplateProps extends PageProps {
  pageContext: Speaker;
}

const SpeakerTemplate: React.ComponentType<ConferenceTemplateProps> = ({ pageContext, location }) => {
  const { id, name, job, description, image } = pageContext;
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "speakers" } }) {
        nodes {
          name
          childImageSharp {
            base: resize(width: 400, height: 400) {
              src
            }
            retina: resize(width: 800, height: 800) {
              src
            }
          }
        }
      }
      allMarkdownRemark(limit: 1000, filter: { frontmatter: { type: { eq: "conference" } } }) {
        nodes {
          frontmatter {
            title
            speaker
            track
            start
            end
            short
          }
          headings(depth: h1) {
            value
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  const images = data.allFile.nodes.filter((imageData) => imageData.name === image)?.[0]?.childImageSharp;
  const conferences = data.allMarkdownRemark.nodes
    .filter((conferenceData) => conferenceData.frontmatter.speaker === id)
    .map((conference) => ({
      ...conference.frontmatter,
      title: conference.headings?.[0].value,
      slug: conference.fields.slug,
    }));

  const firstname = name.split(' ')[0];

  return (
    <Layout location={location}>
      <div className="conf__speaker-profile">
        <div className="speaker__header">
          <SectionTitle dark lined>
            <strong>{name}</strong>
          </SectionTitle>
          <div className="overline speaker__job">{job}</div>
        </div>
        <div className="container">
          <div className="speaker__about">
            <div className="speaker__picture">
              <div className="circle__effect">
                <img
                  width="400"
                  height="400"
                  src={images?.base.src}
                  alt={name}
                  srcSet={`${images?.base.src} 1x, ${images?.retina.src} 2x`}
                  className="circle__picture"
                />
              </div>
            </div>
            <div className="speaker__details">
              <div className="h5 lined lined-left">{`About ${firstname}`}</div>
              <p>{description}</p>
              <SpeakerSocialList speaker={pageContext} />
            </div>
          </div>
          <div className="speaker__schedule">
            <div className="container">
              {conferences.map((conference) => (
                <SpeakerConferenceSlot conference={conference} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpeakerTemplate;
