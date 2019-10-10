import React, { Component } from 'react';
import { githubContributorsList } from '../../lib/apiHelper';
import '../../styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }
  componentWillMount() {
    githubContributorsList.call(this);
  }
  render() {
    return (
      <section className="home__part home__contributors">
        <div className="container references__container">
          <h1 className="references__title">Contributors</h1>
          <table id="contributorsTable" className="table table-condensed">
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Contributions</th>
                <th>Projects Contributed To</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.list.map(data => (
                <tr key={data.id}>
                  <td>
                    <a href={data.profile_url}>{data.name}</a>
                  </td>
                  <td>{data.contributions}</td>
                  <td>
                    {data.projects_contributed_to.map(item => (
                      <div key={item.repo_name}>
                        <a href={item.repo_link}>{item.repo_name}</a>
                      </div>
                    ))}
                  </td>
                  <td>
                    <a href={data.profile_url}>
                      <img src={data.avatar} alt="Github profile avatar" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default App;
