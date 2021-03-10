import React from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

const Layout: React.ComponentType = ({ children }) => {
  dayjs.extend(localizedFormat);

  return <>{children}</>;
};

export default Layout;
