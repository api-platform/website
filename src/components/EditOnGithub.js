import React from 'react';
import pathToGitHubMarkdown from 'helpers/PathToGitHubMarkdown';
import { Glyphicon } from 'react-bootstrap';

export default function({ pagepath }) {
  try {
    const url = pathToGitHubMarkdown(pagepath);
    return (
      <p className="editongithub">
        <a className="editongithub__link" href={url} target="_blank" >
          <Glyphicon glyph="pencil" />
          &nbsp;Edit on GitHub
        </a>
      </p>
    );
  } catch (error) {
    // most probably, the GitHub repo has not be configured
    return (<span></span>);
  }
}
