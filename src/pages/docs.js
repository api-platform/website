import React from 'react';
import PropTypes from 'prop-types';

export const query = graphql`query Tree {
    docsYaml(id: {regex: "/docs/nav.yml/"}) {
      chapters {
        title
        path
        items {
          title
          id
          anchors {
            id
            title
            anchors {
              id
              title
            }
          }
        }
      }
    }
}`;

function renderAnchors(item, path, subject, lvl = 2) {
  lvl += 1;
  if (!item || !item.anchors) return;

  return (
    <ul key={`ul-${item.id}`}>
      <a></a>
      { item.anchors.map((anchor) => {
        return (
          <li key={`li-${anchor.id}`}>
            <a href={lvl > 4 ? `/docs/${path}/${subject}#${anchor.id}` : `/docs/${path}#${anchor.id}`}>{anchor.title}</a>{renderAnchors(anchor, path, subject, lvl)}
          </li>
        );
        })
      }
    </ul>
  );
  lvl += 1;
}

export default ({ data: { docsYaml: { chapters } } }) => {
  return (
    <div>
      { chapters.map(({ title, items, path }) =>
        <h2 key={title}>{ title }{items.map((item => renderAnchors(item, path, item.id)))}</h2>) }
    </div>
  );
};
