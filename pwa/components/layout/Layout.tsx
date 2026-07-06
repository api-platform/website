import Nav from "components/layout/Nav";
import Footer from "components/layout/Footer";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import classNames from "classnames";
import { Providers } from "app/common/providers";
import dayjs from "dayjs";

function Layout({ children }: { children: React.ReactNode }) {
  dayjs.extend(localizedFormat);
  dayjs.extend(customParseFormat);

  return (
    <>
      <div
        className={classNames(
          "relative w-full overflow-x-clip bg-white dark:bg-blue-black"
        )}
      >
        <Providers>
          <Nav withPreheader={true} />
        </Providers>
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
