import React, { useRef } from 'react';
import Wave from '@con/common/Wave';
import Web from '@con/common/Web';
import Logo from '@con/images/logo.svg';
import { StaticImage } from 'gatsby-plugin-image';
import editions from '@con/data/editions';
import { Edition } from '@con/types';
import ContactCard from '@con/common/ContactCard';
import { useIntersection } from 'react-use';
import useAnimation from '@con/hooks/useAnimation';
import EditionCard from '../editions/EditionCard';
import PictureGallery from '../common/PictureGallery';

const Landing: React.ComponentType = () => {
  const lastEdition: Edition = editions?.[editions.length - 1];

  const coverRef = useRef(null);
  const intersection = useIntersection(coverRef, {
    threshold: 0.5,
  });

  const isWebVisible = intersection?.isIntersecting;

  const animationPrevious = useAnimation('top');

  return (
    <>
      <section ref={coverRef} className="conf__landing">
        <div className="container py-20">
          <h1 className="conf__landing-logo">
            <img src={Logo} alt="Api Platform Conference" width="300" height="64" />
          </h1>
          <span className="conf__landing-baseline">Edition 2022 in progress...</span>
        </div>
        <Web className="conf__landing-web" animated isVisible={isWebVisible} />
        <div className="conf__landing-last-edition" ref={animationPrevious}>
          <div className="text-medium uppercase font-bold mb-5">Previous edition</div>
          <EditionCard edition={lastEdition} size="small" />
        </div>
        <Wave className="conf__landing-wave" animated={false} />
      </section>
      <PictureGallery>
        <StaticImage src="./picture1.jpeg" alt="Api platform con 2021 picture" height={400} />
        <StaticImage src="./picture2.jpeg" alt="Api platform con 2021 picture" height={400} />
        <StaticImage src="./picture3.jpeg" alt="Api platform con 2021 picture" height={400} />
        <StaticImage src="./picture4.jpeg" alt="Api platform con 2021 picture" height={400} />
        <StaticImage src="./picture5.jpeg" alt="Api platform con 2021 picture" height={400} />
        <StaticImage src="./picture6.jpeg" alt="Api platform con 2021 picture" height={400} />
      </PictureGallery>
      <div className="conf__contact">
        <ContactCard />
      </div>
    </>
  );
};

export default Landing;
