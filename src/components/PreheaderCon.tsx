import React from 'react';
import { Link } from 'gatsby';
import Logo from '@con/images/logo.svg';
import Web from '@con/components/common/Web';
import Button from './common/Button';

const PreheaderCon: React.ComponentType = () => (
  <Link to="/con/2022">
    <div className="preheader preheader-con" role="button">
      <Web className="preheader-con__web con__web" isVisible />
      <img src={Logo} alt="Api Platform Conference" height="40" />
      <div className="preheader-con__text">
        <p>The conference dedicated to API Platform and its ecosystem</p>
        <div>
          <strong>Sep 15, 16 2022</strong> | Lille & online
        </div>
      </div>
      <Button text="Discover the program" className="preheader-con__button small empty white" />
    </div>
  </Link>
);

export default PreheaderCon;
