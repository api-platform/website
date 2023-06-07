import CodeSelector from "app/common/components/doc/CodeSelector";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";

const GetBaseComponents = {
  CodeSelector: (props: React.HTMLAttributes<HTMLDivElement>) => {
    return <CodeSelector>{props.children}</CodeSelector>;
  },
  a: (props: Omit<LinkProps, "className">) => (
    <Link className="text-blue font-semibold not-prose" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className={classNames(
        props.className,
        "text-sm whitespace-pre-wrap leading-relaxed bg-gray-100 dark:bg-blue-darkest p-6 rounded-2xl mt-2 mb-4 group is-pre overflow-x-auto not-prose"
      )}
    />
  ),
  code: (props: Omit<React.HTMLAttributes<HTMLElement>, "className">) => (
    <code
      {...props}
      className="whitespace-pre-wrap break-words  group-[.is-pre]:break-normal not-prose"
    />
  ),
};

export default GetBaseComponents;
