import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Speaker } from '@con/types';
import SpeakerSocialList from './SpeakerSocialList';

interface SpeakerCircleProps {
  speaker: Speaker;
  social?: boolean;
  hoverable?: boolean;
}

const SpeakerCircle: React.ComponentType<SpeakerCircleProps> = ({ speaker, social = true, hoverable = true }) => {
  const { id, name, job, company } = speaker;
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "speakersImages" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 240, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  `);
  const images = data.allFile.nodes.find((imageData) => imageData.name === id);
  const image = images && getImage(images);

  const speakerData = {
    '@context': 'http://schema.org',
    '@type': 'Person',
    name: speaker.name,
    jobTitle: `${speaker.job} ${speaker.company ? `@ ${speaker.company}` : ''}`,
  };

  return (
    <div className="conf__speaker-resume">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(speakerData)}</script>
      </Helmet>
      <a className={classNames('conf__speaker-content', { hoverable })} href={speaker.slug}>
        <div className="circle__effect">
          <div className="circle">
            <GatsbyImage image={image} className="circle__picture" alt={name} />
            <svg className="circle__plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.49 281.49">
              <path d="M140.74,0C63.14,0,0,63.14,0,140.74S63.14,281.49,140.74,281.49s140.75-63.14,140.75-140.75S218.35,0,140.74,0Zm0,263.49A122.75,122.75,0,1,1,263.49,140.74,122.88,122.88,0,0,1,140.74,263.49Z" />
              <path d="M210.91,131.74H149.74V70.58a9,9,0,1,0-18,0v61.16H70.58a9,9,0,1,0,0,18h61.16v61.17a9,9,0,0,0,18,0V149.74h61.17a9,9,0,0,0,0-18Z" />
            </svg>
          </div>
        </div>
        <div className="infos">
          <h3 className="h5">{name}</h3>
          <p className="overline lined">
            {job}
            <br />
            {company ? (
              <>
                @ <strong>{company}</strong>
              </>
            ) : null}
          </p>
        </div>
      </a>
      {social && <SpeakerSocialList speaker={speaker} />}
    </div>
  );
};

export default SpeakerCircle;
