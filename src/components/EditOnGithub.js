import React from 'react';
import { documentPathToGithubMarkdown } from 'helpers/docpath';
import { Glyphicon } from 'react-bootstrap';

export default function({ pagepath }) {
  try {
    const url = documentPathToGithubMarkdown(pagepath);
    return (
      <span className="editongithub">
        <a className="editongithub__link" href={url} target="_blank" >
          <Glyphicon glyph="pencil" />
          &nbsp;Edit on GitHub
        </a>
      </span>
    );
  } catch (error) {
    // most probably, the Github repo has not be configured
    return (<span></span>);
  }
}
