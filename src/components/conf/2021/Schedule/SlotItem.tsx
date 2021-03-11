import React, { Fragment } from 'react';
import classNames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import dayjs from 'dayjs';
import { FullConference, Speaker } from '../types';

const Avatar: React.ComponentType<{ speakers: Speaker[] }> = ({ speakers }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "speakers" } }) {
        nodes {
          name
          childImageSharp {
            base: resize(width: 90, height: 90, quality: 100) {
              src
            }
            retina: resize(width: 180, height: 180, quality: 100) {
              src
            }
          }
        }
      }
    }
  `);

  const getImages = (image) => data.allFile.nodes.filter((imageData) => imageData.name === image)?.[0]?.childImageSharp;
  const getSize = (total) => {
    if (1 === total) return 90;
    if (2 === total) return 70;
    return 50;
  };
  return (
    <div className="schedule__slot-avatar">
      {speakers.map((speaker, index) => {
        const images = getImages(speaker.image);

        return (
          <div
            key={speaker.name}
            className="avatar__circle"
            style={{
              width: `${getSize(speakers.length)}px`,
              height: `${getSize(speakers.length)}px`,
              left: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
              top: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
            }}
          >
            <img
              width="90"
              height="90"
              src={images?.base.src}
              alt={speaker.name}
              srcSet={`${images?.base.src} 1x, ${images?.retina.src} 2x`}
            />
          </div>
        );
      })}
    </div>
  );
};

interface SlotItemProps {
  conference: FullConference;
}

const SlotItem: React.ComponentType<SlotItemProps> = ({ conference }) => {
  const { speakers, title, time, speakerTitle } = conference;

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
    <div className={classNames('schedule__slot', { 'no-speaker': !speakers?.length })}>
      {speakers?.length && <Avatar speakers={speakers} />}
      <div className="schedule__slot-infos">
        <span className="overline">{convertTime(time)}</span>
        <h3 className={classNames('h5 lined', { 'lined-left': speakers?.length })}>{title}</h3>
        {speakers?.length ? (
          <span className="body2">
            {'by '}
            {speakers.map((speaker, index) => (
              <Fragment key={speaker.name}>
                <a>{speaker.name}</a>
                {index < speakers.length - 1 && ' & '}
              </Fragment>
            ))}
          </span>
        ) : null}
        {speakers?.length ? <span className="body2">{speakerTitle || speakers[0].job}</span> : null}
      </div>
    </div>
  );
};

export default SlotItem;
