import Heading from "components/common/typography/Heading";
import ContentFormatter from "components/common/ContentFormatter";

export default async function Page() {
  return (
    <div className="py-16">
      <div className="bg-blue">
        <div className="text-center py-12 text-white dark:text-blue-black">
          <Heading size="xl" level="h1">
            Trademark <strong>policy</strong>
          </Heading>
        </div>
      </div>
      <div className="container max-w-5xl pt-16 font- leading-relaxed">
        <div className="w-full flex flex-col items-center pb-16 | sm:flex-row">
          <img
            src="/images/copyright.svg"
            width={50}
            height={50}
            className="w-full pb-14 | sm:w-1/3 sm:pb-0"
            alt="copyright logo"
          />
          <p className="font-semibold | sm:pl-8">
            API Platform is built by its community. We share these guidelines to
            provide our requirements regarding the use of the logotypes of API
            Platform available for download from our website (or any other
            trademarks, logos, slogans, copyrighted designs or other brand
            features of API Platform obtained from the website).
          </p>
        </div>
        <ContentFormatter className="max-w-5xl font-light">
          <h2>Property</h2>
          <p>
            The Logos are the sole and exclusive property of API Platform and{" "}
            <strong>Les-Tilleuls.coop</strong>.
          </p>
          <h2>Permitted use of our marks</h2>
          <p>
            Proper use of our Marks on websites to name or accurately describe{" "}
            <strong>Les-Tilleuls.coop</strong>’s products, services or
            technology is permitted.
          </p>
          <p>
            The use of our Marks should not be misleading or likely to cause
            confusion as to whether the website is sponsored by or affiliated
            with <strong>Les-Tilleuls.coop</strong> or whether the products,
            services or technology are offered by{" "}
            <strong>Les-Tilleuls.coop</strong>.
          </p>
          <p>
            API Platform and <strong>Les-Tilleuls.coop</strong> reserve the
            right to revoke their approval of your use of the logos at any time.
          </p>
          <h2>Forbidden use of our marks</h2>
          <ul className="list-circle pl-8 gap-4 | sm:pl-12">
            <li>As part of your own trademark.</li>
            <li>
              In any way that suggests that API Platform is affiliated with,
              sponsors, approves or endorses you, your organization, your
              websites, your products or your services, unless such a
              relationship exists. We reserve the right, in our sole discretion,
              to determine when this condition is met or violated.
            </li>
            <li>
              In a manner that disparages <strong>Les-Tilleuls.coop</strong> or
              its products, services or technology.
            </li>
            <li>
              In connection with products, services or activities which, in our
              judgment, may diminish goodwill.
            </li>
            <li>
              In connection with any unlawful activities or to encourage
              unlawful activities.
            </li>
            <li>
              In any manner that discredits API Platform or tarnishes its
              reputation and goodwill
            </li>
            <li>In any manner that is false or misleading</li>
            <li>Use in a domain name or URL.</li>
            <li>
              Use for merchandising purposes, e.g. on swags (t-shirts,
              stickers…)
            </li>
            <li>
              Any and all use of our Marks in connection with account names,
              profiles, avatars or handles on social media platforms is subject
              to the same guidelines set forth herein as for other uses.
            </li>
            <li>
              The use of any of our Marks in an account name or profile name on
              social media platforms is not permitted.
            </li>
            <li>
              Use or reproduction of <strong>Les-Tilleuls.coop</strong>’s
              original works of authorship, including the API Platform “Webby”
              spider design is prohibited without prior approval from{" "}
              <strong>Les-Tilleuls.coop</strong>.
            </li>
          </ul>
          <p>
            Your use of any Logo implies acceptance of, and agreement with, the
            terms of this policy. If you do not accept and agree to follow the
            rules for using the Logos as set out in this policy, you do not have
            the right to use the Logos and should not use them. We may cancel,
            modify, or change the terms of this policy from time to time without
            any notice.
          </p>
          <h2>Questions</h2>
          <p>
            If you&apos;d like to make any use of our Logos that is not covered
            by this policy, or for further information or clarification about
            use of the Logos, please contact us:{" "}
            <a className="link" href="mailto:contact@les-tilleuls.coop">
              contact@les-tilleuls.coop
            </a>
          </p>
        </ContentFormatter>
      </div>
    </div>
  );
}
