"use client";

import InstallCode from "./php/InstallCode.mdx";
import ExposeCode from "./symfony/Expose.mdx";
import PlugCode from "./symfony/Plug.mdx";
import NativeCode from "./symfony/Native.mdx";
import CodeBlock from "./CodeBlock";
import StepContent from "./StepContent";
import TimelineStepTitle from "./TimelineStepTitle";
import ListPoint from "./ListPoint";
import Link from "components/common/Link";

export default function TimelineSymfony() {
  return (
    <div className="relative dark:bg-blue-black">
      <TimelineStepTitle step={1}>Install the framework</TimelineStepTitle>
      <StepContent>
        Install the API Platform Framework
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
            <Link
              href="/docs/distribution/#introduction"
              prefetch={false}
              className="link"
            >
              REST
            </Link>{" "}
            &{" "}
            <Link href="/docs/core/graphql/" prefetch={false} className="link">
              GraphQL
            </Link>{" "}
            API
          </ListPoint>
          <ListPoint>
            <strong>Automatic documentation</strong>{" "}
            <Link href="/docs/core/openapi/" prefetch={false} className="link">
              OpenAPI
            </Link>
            , SwaggerUI, GraphiQL...
          </ListPoint>
          <ListPoint>
            Support for <strong>standards</strong> and formats{" "}
            <Link
              href="/docs/core/extending-jsonld-context/#jsonld"
              prefetch={false}
              className="link"
            >
              JSON-LD
            </Link>
            ,{" "}
            <Link
              href="/docs/core/extending-jsonld-context/#hydra"
              prefetch={false}
              className="link"
            >
              Hydra
            </Link>
            , JSON:API
          </ListPoint>
        </ul>
        <p>
          Alternatively,{" "}
          <Link href="/docs/schema-generator" prefetch={false} className="link">
            generate the classes from an existing RDF vocabulary
          </Link>
          .
          <br />
          <br /> API Platform automatically exposes production-grade{" "}
          <strong>
            <Link
              className="link"
              href="/docs/distribution/#a-bookshop-api"
              prefetch={false}
            >
              HATEOAS
            </Link>
          </strong>{" "}
          API for you!
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
          <Link className="link" href="/docs/core/design/" prefetch={false}>
            Domain-Driven Design
          </Link>{" "}
          or Clean Architecture-like approaches.
        </p>
        <p className="mb-4 sm:mb-24">You can even mix both approaches!</p>
      </StepContent>
      <StepContent>
        <p className="font-semibold text-blue text-2xl mb-4 leading-tight">
          ...or use the native integration with popular persistence libraries!
        </p>
        <br />
        <p>
          API Platform can automatically{" "}
          <Link
            className="link"
            href="/docs/core/state-providers/#state-providers"
            prefetch={false}
          >
            retrieve
          </Link>
          ,{" "}
          <Link
            className="link"
            href="/docs/core/state-processors/"
            prefetch={false}
          >
            persist
          </Link>
          ,{" "}
          <Link href="/docs/core/pagination" prefetch={false} className="link">
            paginate
          </Link>{" "}
          and{" "}
          <Link href="/docs/core/validation" prefetch={false} className="link">
            validate
          </Link>{" "}
          data using the most popular database systems thanks to{" "}
          <a
            href="https://laravel.com/docs/11.x/eloquent"
            target="_blank"
            className="link"
          >
            Eloquent
          </a>{" "}
          or{" "}
          <a
            href="https://www.doctrine-project.org/"
            target="_blank"
            className="link"
          >
            Doctrine
          </a>
          .
        </p>
        <br/>
        <p>
          <Link
            href="/docs/distribution/#plugging-the-persistence-system"
            prefetch={false}
            className="link"
          >
            PostgreSQL
          </Link>
          ,{" "}
          <Link href="/docs/core/mongodb/" prefetch={false} className="link">
            MongoDB
          </Link>
          ,{" "}
          <Link
            href="/docs/core/elasticsearch/#elasticsearch-support"
            prefetch={false}
            className="link"
          >
            ElasticSearch
          </Link>
          , SQLite, MySQL, MariaDB, SQL Server and Oracle are supported{" "}
          <Link href="/docs/core/state-providers/#state-providers">
            out of the box
          </Link>
          .
        </p>
      </StepContent>
      <StepContent className="sm:mt-24">
        <p className="font-semibold text-blue text-2xl leading-tight">
          You can also make your own{" "}
          <Link
            href="/docs/core/state-processors/"
            prefetch={false}
            className="link"
          >
            persistence system
          </Link>
          !
        </p>
      </StepContent>
      <TimelineStepTitle step={4}>Customize!</TimelineStepTitle>
      <StepContent withPoint={false}>
        <p>
          Customize every single behavior thanks to our carefully designed
          <Link href="/docs/core/extending/" prefetch={false} className="link">
            {" "}
            extension points
          </Link>
          .
        </p>
        <br />
      </StepContent>
    </div>
  );
}
