import React from 'react';
import Layout from '@con/components/layout';
import ContactCard from '@con/components/common/ContactCard';
import Review from '@con/components/2021/Review';
import { PageProps } from 'gatsby';

const Conf2021: React.ComponentType<PageProps> = () => {
  return (
    <Layout logoAlwaysVisible edition="2021">
      <Review />
      <div className="conf__contact">
        <ContactCard />
      </div>
    </Layout>
  );
};

export default Conf2021;
