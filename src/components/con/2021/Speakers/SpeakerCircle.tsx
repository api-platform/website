import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Speaker } from '../types';
import SpeakerSocialList from './SpeakerSocialList';
import slugify from '../../../../lib/slugHelper';

interface SpeakerCircleProps {
  speaker: Speaker;
  social?: boolean;
  hoverable?: boolean;
}

const SpeakerCircle: React.ComponentType<SpeakerCircleProps> = ({ speaker, social = true, hoverable = true }) => {
  const { image, name, job } = speaker;
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "speakers" } }) {
        nodes {
          name
          childImageSharp {
            base: resize(width: 240, height: 240) {
              src
            }
            retina: resize(width: 480, height: 480) {
              src
            }
          }
        }
      }
    }
  `);

  const images = data.allFile.nodes.filter((imageData) => imageData.name === image)?.[0]?.childImageSharp;
  const speakerData = {
    '@context': 'http://schema.org',
    '@type': 'Person',
    name: speaker.name,
    jobTitle: speaker.job,
  };

  return (
    <div className="conf__speaker-circle">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(speakerData)}</script>
      </Helmet>
      <Link
        className={classNames('conf__speaker-content', { hoverable })}
        to={`/con/2021/speakers/${slugify(speaker.name)}`}
      >
        <div className="circle__effect">
          <div className="circle">
            <img
              width="240"
              height="240"
              src={images?.base.src}
              alt={name}
              srcSet={`${images?.base.src} 1x, ${images?.retina.src} 2x`}
              className="circle__picture"
            />
            <svg className="circle__plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.49 281.49">
              <path d="M140.74,0C63.14,0,0,63.14,0,140.74S63.14,281.49,140.74,281.49s140.75-63.14,140.75-140.75S218.35,0,140.74,0Zm0,263.49A122.75,122.75,0,1,1,263.49,140.74,122.88,122.88,0,0,1,140.74,263.49Z" />
              <path d="M210.91,131.74H149.74V70.58a9,9,0,1,0-18,0v61.16H70.58a9,9,0,1,0,0,18h61.16v61.17a9,9,0,0,0,18,0V149.74h61.17a9,9,0,0,0,0-18Z" />
            </svg>
          </div>
        </div>
        <div className="infos">
          <span className="overline">{job}</span>
          <h3 className="h5 lined">{name}</h3>
        </div>
      </Link>
      {social && <SpeakerSocialList speaker={speaker} />}
    </div>
  );
};

export default SpeakerCircle;
