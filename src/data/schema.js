const schema = [
  {
    title: 'Shape the data',
    items: [
      {
        icon: 'data',
        link: '/docs/schema-generator',
        title: 'Create a Model',
        text:
          'Design your own data model as plain old PHP classes or import an existing structure from RDF vocabularies such as Schema.org.',
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
          'Get your API in minutes. Stream changes in real-time using Mercure. Embrace the open web with JSON-LD/Hydra, GraphQL, JSON:API and many more.',
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
        link: '/docs/core/openapi',
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
        text: 'Generate Next.js, Nuxt.js, Vuetify, Quasar, Vue.js, React and React Native apps from the API docs.',
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
        title: 'Tests',
        text: 'Add tests with ease using our developer friendly API testing tool.',
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
