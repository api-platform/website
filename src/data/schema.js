const schema = [
  {
    title: 'Designing data model',
    items: [
      {
        icon: 'data',
        link: '/docs/schema-generator/index',
        title: 'Create your data model',
        text:
          'Design your own data model as plain old PHP classes or import an existing one from the Schema.org vocabulary.',
      },
    ],
  },
  {
    title: 'Building server',
    items: [
      {
        icon: 'expose',
        link: '/docs/core/index',
        title: 'Expose your API',
        text:
          'API Platform embraces open web standards : JSON-LD, Hydra, HAL, YAML, JSON, XML and CSV are supported out of the box.',
      },
      {
        icon: 'security',
        link: '/docs/core/security',
        title: 'Add Auth',
        text:
          'Easily add JSON Web Token or OAuth authentication. Supports CORS and implements OWASP’s recos.',
      },
      {
        icon: 'doc',
        link: '/docs/core/swagger',
        title: 'Browse automatic documentation',
        text:
          'Enjoy the beautiful automatically generated API documentation (Swagger/OpenAPI).',
      },
    ],
  },
  {
    title: 'Building clients',
    items: [
      {
        icon: 'app',
        link: '/docs/client-generator/index',
        title: 'Scaffold app',
        text: 'Generate a CRUD application from your API.',
      },
      {
        icon: 'admin',
        link: '/docs/admin/index',
        title: 'Create admin',
        text:
          'Build easily a React Admin for your API with the admin component.',
      },
    ],
  },
  {
    title: 'Testing',
    items: [
      {
        icon: 'test',
        link: '/docs/distribution/testing',
        title: 'Test',
        text:
          'Create specs and tests with a developer friendly API testing tool on top of Behat.',
      },
    ],
  },
  {
    title: 'Deployment',
    items: [
      {
        icon: 'deploy',
        link: '/docs/deployment/index',
        title: 'Deploy',
        text:
          'Install a development environment and deploy your project in production using Docker and Kubernetes.',
      },
    ],
  },
];

export default schema;
