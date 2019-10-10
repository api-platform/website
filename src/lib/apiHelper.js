import axios from 'axios';

const GITHUB_GET_API_PLATFORM_REPOS_URL = 'https://api.github.com/orgs/api-platform/repos';
const GITHUB_API_REPOS_LINK = 'https://api.github.com/repos';

// Don't include these repositories in our contributors page. For example, '.github'
const REPOSITORIES_TO_IGNORE = [];

function getGithubContributorLinkByRepoName(repoName) {
  return `${GITHUB_API_REPOS_LINK}/${repoName}/contributors`;
}

function createContributorFromResponse(repositoryName, repositoryLink, response) {
  return {
    id: response.id,
    name: response.login,
    avatar: response.avatar_url,
    profile_url: response.html_url,
    projects_contributed_to: [{ repo_name: repositoryName, repo_link: repositoryLink }],
    contributions: response.contributions,
  };
}

function getListOfContributorsByUrl(githubApiUrlToListContributors, repositoryLink, nameOfRepository) {
  return axios.get(window.encodeURI(githubApiUrlToListContributors)).then(response => {
    return response.data.map(e => createContributorFromResponse(nameOfRepository, repositoryLink, e));
  });
}

// From the repositories response, return a link which can be used to get a list of contributors for the repository
function getContributorLinkFromResponse(githubResponse) {
  return {
    api_get_contributor_link: getGithubContributorLinkByRepoName(githubResponse.full_name),
    repository_link: githubResponse.html_url,
    name: githubResponse.name,
  };
}

function getRepositoriesList() {
  return axios.get(window.encodeURI(GITHUB_GET_API_PLATFORM_REPOS_URL)).then(response => {
    return response.data
      .map(e => getContributorLinkFromResponse(e))
      .filter(e => !REPOSITORIES_TO_IGNORE.includes(e.name));
  });
}

function getListOfContrubotrsFromGithubApiLinks(listOfContributorsApiLinks) {
  const listOfContributors = [];
  const listOfPromises = [];

  for (let i = 0; i < listOfContributorsApiLinks.length; i += 1) {
    listOfPromises.push(
      getListOfContributorsByUrl(
        listOfContributorsApiLinks[i].api_get_contributor_link,
        listOfContributorsApiLinks[i].repository_link,
        listOfContributorsApiLinks[i].name
      )
    );
  }

  return Promise.all(listOfPromises).then(arrayOfProjectsWithContributors => {
    arrayOfProjectsWithContributors.forEach(arrayOfContributors => {
      arrayOfContributors.forEach(contributor => {
        const personFromList = listOfContributors.find(c => c.name === contributor.name);
        // if the contributor is in list already
        if (personFromList) {
          personFromList.contributions += contributor.contributions;

          personFromList.projects_contributed_to.push(contributor.projects_contributed_to[0]);
        } else {
          listOfContributors.push(contributor);
        }
      });
    });

    // sort the list before resolving
    listOfContributors.sort((a, b) => b.contributions - a.contributions);
    return listOfContributors;
  });
}

function getCompleteListOfContributors() {
  return getRepositoriesList().then(getListOfContrubotrsFromGithubApiLinks);
}

export default function () {
  getCompleteListOfContributors().then(response => {
    this.setState({ list: response });
  });
}
