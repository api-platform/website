import React from 'react';
import { PageProps } from 'gatsby';
import Layout from '@con/components/2022/layout';
import SchedulePage from '@con/components/2022/SchedulePage';

const Schedule: React.ComponentType<PageProps> = () => (
  <Layout logoAlwaysVisible>
    <SchedulePage />
  </Layout>
);

export default Schedule;
