import classNames from "classnames";
import styles from "./Timeline.module.css";
import InstallCode from "./timeline/Install.mdx";
import ExposeCode from "./timeline/Expose.mdx";
import PlugCode from "./timeline/Plug.mdx";
import NativeCode from "./timeline/Native.mdx";
import CodeBlock from "./timeline/CodeBlock";
import StepContent from "./timeline/StepContent";
import TimelineStepTitle from "./timeline/TimelineStepTitle";
import ListPoint from "./timeline/ListPoint";
import Link from "components/common/Link";

export default function Timeline() {
  return (
    <div
      className={classNames(
        "w-full ml-auto mt-4 relative border-dotted border-l-blue pt-8 | sm:pt-20 sm:border-l-2 sm:text-left md:w-1/2",
        styles.timeline
      )}
    >
      <div className="relative dark:bg-blue-black">
        <TimelineStepTitle step={1}>Install the framework</TimelineStepTitle>
        <StepContent>
          Install Docker and optionally GitHub CLI.
          <CodeBlock title="Install">
            <InstallCode />
          </CodeBlock>
        </StepContent>
        <StepContent className="sm:mt-32">
          <p className="font-semibold text-blue text-2xl mb-4 leading-tight">
            Your development environment is ready!{" "}
          </p>
          Continuous integration (GitHub Action) as well as recipes to deploy in
          production with{" "}
          <Link
            href="/docs/deployment/docker-compose/#deploying-with-docker-compose"
            prefetch={false}
            className="link"
          >
            Docker Compose
          </Link>{" "}
          or{" "}
          <Link
            href="/docs/deployment/kubernetes/"
            className="link"
            prefetch={false}
          >
            Kubernetes
          </Link>{" "}
          are also pre-installed.
        </StepContent>
        <TimelineStepTitle step={2}>
          Define the resources
          <span className="block text-xl normal-case">
            as PHP classes, or using OpenAPI
          </span>
        </TimelineStepTitle>
        <StepContent>
          <CodeBlock title="Define the resources to expose">
            <ExposeCode />
          </CodeBlock>
          You get:
          <ul className="mt-8 mb-16">
            <ListPoint>
              A stable <strong>state-of-the-art</strong>{" "}
              <a
                className="link"
                href="https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm"
                target="_blank"
                rel="noreferer noopener"
              >
                REST
              </a>{" "}
              &{" "}
              <a
                className="link"
                href="https://graphql.org/"
                target="_blank"
                rel="noreferer noopener"
              >
                GraphQL
              </a>{" "}
              API
            </ListPoint>
            <ListPoint>
              <strong>Automatic documentation</strong>{" "}
              <a
                className="link"
                href="https://www.openapis.org/"
                target="_blank"
                rel="noreferer noopener"
              >
                OpenAPI
              </a>
              , SwaggerUI, GraphiQL...
            </ListPoint>
            <ListPoint>
              Support for <strong>standards</strong> and formats{" "}
              <a
                className="link"
                href="https://json-ld.org/"
                target="_blank"
                rel="noreferer noopener"
              >
                JSON-LD
              </a>
              ,{" "}
              <a
                className="link"
                href="https://hydra-cg.com/"
                target="_blank"
                rel="noreferer noopener"
              >
                Hydra
              </a>
              , JSON:API
            </ListPoint>
          </ul>
          <p>
            Alternatively,{" "}
            <Link href="/docs/schema-generator" prefetch={false}>
              generate the classes from an existing RDF vocabulary
            </Link>
            .
            <br />
            <br /> API Platform automatically exposes production-grade{" "}
            <strong>HATEOAS</strong> API for you!
          </p>
        </StepContent>
        <TimelineStepTitle step={3}>
          Plug your business & persistence logic
        </TimelineStepTitle>
        <StepContent withPoint={false}>
          <CodeBlock title="Plug your logic">
            <PlugCode />
          </CodeBlock>
          <p className="mt-6 sm:mt-0">
            The framework has been designed from the ground up to be usable from
            Rapid Application Development contexts to{" "}
            <a
              className="link"
              href="https://github.com/mtarld/apip-ddd"
              target="_blank"
              rel="noreferer noopener"
            >
              Domain-Driven Design
            </a>{" "}
            or Clean Architecture-like approaches.
          </p>
          <p className="mb-4 sm:mb-24">You can even mix both approaches!</p>
        </StepContent>
        <StepContent>
          <p className="font-semibold text-blue text-2xl mb-4 leading-tight">
            ...or use the native integration with popular persistence libraries!
          </p>
          <CodeBlock title="Native integration">
            <NativeCode />
          </CodeBlock>
          <br />
          <p>
            API Platform can automatically retrieve, persist, paginate and
            validate data using the most popular database systems.
          </p>
          <p>
            PostgreSQL ,{" "}
            <Link href="/docs/core/mongodb/" prefetch="false" className="link">
              MongoDB
            </Link>
            ,{" "}
            <Link
              href="/docs/core/elasticsearch/#elasticsearch-support"
              prefetch="false"
              className="link"
            >
              ElasticSearch
            </Link>
            , SQLite, MySQL, MariaDB, SQL Server and Oracle are supported out of
            the box.
          </p>
        </StepContent>
        <StepContent className="sm:mt-24">
          <p className="font-semibold text-blue text-2xl leading-tight">
            You can also make your own persistence system!
          </p>
        </StepContent>
        <TimelineStepTitle step={4}>Customize!</TimelineStepTitle>
        <StepContent withPoint={false}>
          <p>
            Customize every single behavior thanks to our carefully designed
            extension points.
          </p>
          <br />
        </StepContent>
      </div>
    </div>
  );
}
