import React from 'react';
import { PageProps } from 'gatsby';
import '@con/styles/landing/index.scss';
import { previousEditions } from '@con/data/editions';
import EditionCard from '@con/components/editions/EditionCard';
import Layout from '@con/components/layout';
import SectionTitle from '@con/components/common/SectionTitle';
import ContactCard from '@con/components/common/ContactCard';

const Editions: React.ComponentType<PageProps> = () => (
  <Layout logoAlwaysVisible>
    <>
      <div className="conf__speakers-list">
        <div className="container">
          <div className="speakers__header">
            <SectionTitle h1 dark>
              What happened <strong>last few years</strong>?
            </SectionTitle>
            <p className="conf__section-subtitle">{`Re-discover our ${previousEditions.length} previous editions`}</p>
          </div>
          <div className="flex flex-row items-center justify-center mx-auto pb-200">
            {previousEditions.map((edition) => (
              <EditionCard withEditionTitle size="big" edition={edition} />
            ))}
          </div>
        </div>
      </div>
      <div className="conf__contact">
        <ContactCard />
      </div>
    </>
  </Layout>
);

export default Editions;
