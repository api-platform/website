import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import HeaderNav from '../Navigation/HeaderNav';

@asyncConnect([{
  promise: ({store: {}}) => {
    const promises = [];
    return Promise.all(promises);
  }
}])
@connect(
  state => state,
  {pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');
    const headerNavigation = '/' !== this.props.location.pathname ? <HeaderNav /> : null;

    return (
      <div>
        <Helmet {...config.app.head}/>

        {headerNavigation}

        {this.props.children}

        <footer id="footer" className="container footer">
            <div>
              <iframe src="https://ghbtns.com/github-btn.html?user=api-platform&repo=api-platform&type=star&count=true&size=small" frameBorder={0} scrolling={0} width="100px" height="20px" />
              <a href="https://twitter.com/ApiPlatform" className="twitter-follow-button" data-show-count="true" data-show-screen-name="false">Follow @ApiPlatform</a>
            </div>
            <p>
              © <a href="https://dunglas.fr" target="_blank">Kévin Dunglas</a> 2016. Supported by <a href="https://les-tilleuls.coop" target="_blank">Les-Tilleuls.coop</a>.
              Code licensed under <a href="https://github.com/api-platform/api-platform/blob/master/LICENSE" target="_blank">MIT</a>,
              documentation under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>.
            </p>
        </footer>
      </div>
    );
  }
}
