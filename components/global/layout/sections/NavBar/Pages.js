import { useRouter } from "next/router";

import { Box } from "@chakra-ui/react";

import GlobalLayoutNavBarSelectedPageBtn from "./components/SelectedPageBtn";
import GlobalLayoutNavBarPageBtn from "./components/PageBtn";
import GlobalLayoutNavBarCreateEventBtn from "./components/CreateEventBtn";

import { Pages } from "../../../../items";

const GlobalLayoutNavBarPages = (props) => {
  const router = useRouter();
  const path = router.asPath;

  const getPagePath = (path) => {
    for (let n = 1; n < path.length; n++) {
      if (path.substring(n, n + 1) == "/") {
        return path.substring(1, n);
      }
    }
    return path.substring(1, path.length);
  };

  return (
    <Box my={"20px"}>
      {Pages.map((page, index) => {
        if (getPagePath(path) === page.id) {
          return (
            <GlobalLayoutNavBarSelectedPageBtn
              iconSelected={page.iconSelected}
              alt={page.alt}
              title={page.title}
              link={page.link}
              onClose={props.onClose}
            />
          );
        } else if (page.id === "create event") {
          return <GlobalLayoutNavBarCreateEventBtn />;
        } else {
          return (
            <GlobalLayoutNavBarPageBtn
              icon={page.icon}
              alt={page.alt}
              title={page.title}
              link={page.link}
              onClose={props.onClose}
            />
          );
        }
      })}
    </Box>
  );
};

export default GlobalLayoutNavBarPages;
