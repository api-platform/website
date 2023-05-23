import React from 'react';
import Logo from '@con/images/logo.svg';
import Web from '@con/components/common/Web';
import Button from './common/Button';

const PreheaderCon: React.ComponentType = () => (
  <a href={`${process.env.GATSBY_ROOT_URL}/con/2023?y=2023`}>
    <div className="preheader preheader-con" role="button">
      <Web className="preheader-con__web con__web" isVisible />
      <img src={Logo} alt="Api Platform Conference" height="40" />
      <div className="preheader-con__text">
        <p>The conference dedicated to API Platform and its ecosystem</p>
        <div>
          <strong>Sep 21, 22 2023</strong> | Lille & online
        </div>
      </div>
      <Button text="Register now" className="preheader-con__button small empty white" />
    </div>
  </a>
);

export default PreheaderCon;
