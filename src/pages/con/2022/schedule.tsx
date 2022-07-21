import React from 'react';
import { Helmet } from 'react-helmet';
import { PageProps } from 'gatsby';
import Layout from '@con/components/2022/layout';
import SchedulePage from '@con/components/2022/SchedulePage';

const Schedule: React.ComponentType<PageProps> = () => (
  <Layout logoAlwaysVisible>
    <Helmet>
      <title>Schedule</title>
      <meta property="og:title" content="Schedule" />
      <meta name="twitter:title" content="Schedule" />
    </Helmet>
    <SchedulePage />
  </Layout>
);

export default Schedule;
