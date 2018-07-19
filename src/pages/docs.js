import React from 'react';

export const query = graphql`query Tree {
    docsYaml(id: {regex: "/docs/nav.yml/"}) {
        chapters {
            title
            path
            items {
                title
                anchors {
                    id
                    anchors {
                        id
                    }
                }
            }
        }
    }
}`

export default ({ data }) => {
  console.log(data);
  return (
    <div>
      { data.docsYaml.chapters.map(({ title, items }) => <h1>{ title } { items[1].title }</h1>) }
    </div>
  );
};
