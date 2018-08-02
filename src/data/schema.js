const schema = [
  {
    title: 'Shape the data',
    items: [
      {
        icon: 'data',
        link: '/docs/schema-generator',
        title: 'Create a Model',
        text:
          'Design your own data model as plain old PHP classes or import an existing structure from the Schema.org vocabulary.',
      },
    ],
  },
  {
    title: 'Build the Server',
    items: [
      {
        icon: 'expose',
        link: '/docs/core',
        title: 'Expose your API',
        text:
          'Embrace the open web: JSON-LD/Hydra, GraphQL, JSON API, HAL, YAML, JSON, XML and CSV are supported out of the box.',
      },
      {
        icon: 'security',
        link: '/docs/core/security',
        title: 'Add Auth',
        text:
          'Add JSON Web Token or OAuth authentication in a breath. CORS support is built-in. OWASP’s best practices are automatically enforced.',
      },
      {
        icon: 'doc',
        link: '/docs/core/swagger',
        title: 'Browse the Docs',
        text: 'Enjoy the beautiful, automatically generated, API documentation (Swagger/OpenAPI).',
      },
    ],
  },
  {
    title: 'Add clients',
    items: [
      {
        icon: 'app',
        link: '/docs/client-generator',
        title: 'PWA and Mobile',
        text: 'Generate React, React Native and Vue.js apps from the API docs.',
      },
      {
        icon: 'admin',
        link: '/docs/admin',
        title: 'Create an Admin',
        text: 'A nice Material UI admin interface built with React is automatically available!',
      },
    ],
  },
  {
    title: 'Test',
    items: [
      {
        icon: 'test',
        link: '/docs/distribution/testing',
        title: 'Specs & Tests',
        text:
          'Add unit tests with PHPUnit. Create specs and tests with a developer friendly API testing tool on top of Behat. A Postman integration is also provided.',
      },
    ],
  },
  {
    title: 'Deploy',
    items: [
      {
        icon: 'deploy',
        link: '/docs/deployment',
        title: 'Cloud Native',
        text:
          'Install a development environment and deploy your project in production using Docker, Kubernetes and the Helm package manager.',
      },
    ],
  },
];

export default schema;
