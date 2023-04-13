import Heading from "components/common/typography/Heading";
import classNames from "classnames";
import ContentFormatter from "components/common/ContentFormatter";

interface CodeOfConductPageProps {
  content: string;
}

export default function CodeOfConductPage({ content }: CodeOfConductPageProps) {
  return (
    <div className="py-16">
      <div className="bg-blue">
        <div className="container text-center py-12 text-white">
          <Heading size="xl" level="h1">
            Contributor <strong>code of conduct</strong>
          </Heading>
        </div>
      </div>
      <ContentFormatter
        className={classNames(
          "container pt-16 px-12 font-light leading-relaxed max-w-5xl"
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
