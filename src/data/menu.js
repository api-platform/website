const menu = [
  {
    text: "docs",
    rootPath: "/docs",
    path: "/docs",
    submenu: [
      {
        text: "Distribution",
        path: "/docs/distribution/"
      },
      {
        text: "API component",
        path: "/docs/core/"
      },
      {
        text: "Schema component",
        path: "/docs/schema-generator/"
      },
      {
        text: "Admin component",
        path: "/docs/admin/"
      },
      {
        text: "Scaffolding component",
        path: "/docs/client-generator/"
      },
      {
        text: "Deployment",
        path: "/docs/deployment/"
      }
    ]
  },
  {
    text: "Screencasts",
    path: "https://symfonycasts.com/tracks/rest?cid=apip#api-platform"
  },
  {
    text: "Demo",
    path: "https://demo-client.api-platform.com/"
  },
  {
    text: "Resources",
    path: "/resources/news",
    rootPath: "/resources",
    submenu: [
      {
        text: "News",
        path: "/resources/news/"
      },
            {
        text: "Logos",
        path: "/resources/logos/"
      },
      {
        text: "Wallpapers",
        path: "/resources/wallpapers/"
      }
    ]
  },
  {
    text: "Community",
    path: "/community",
    rootPath: "/community",
    submenu: [
      {
        text: "Overview",
        path: "/community"
      },
      {
        text: "Contributors",
        path: "/community/contributors/"
      },
      {
        text: "Events",
        path: "/community/events/"
      }
    ]
  }
];

export default menu;
