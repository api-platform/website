import React from 'react';
import Layout from '@components/con/layout';
import ContactCard from '@con/common/ContactCard';
import Review from '@components/con/2021/Review';
import { PageProps } from 'gatsby';

const Conf2021: React.ComponentType<PageProps> = () => {
  return (
    <Layout logoAlwaysVisible>
      <Review />
      <div className="conf__contact">
        <ContactCard />
      </div>
    </Layout>
  );
};

export default Conf2021;
