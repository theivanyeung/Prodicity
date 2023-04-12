import { useRouter } from "next/router";

import { Box, List, ListItem } from "@chakra-ui/react";

import SettingsLayoutPageBtn from "./Btn/PageBtn";
import SettingsLayoutSelectedPageBtn from "./Btn/SelectedPageBtn";

import { SettingsOptions } from "../../../items";

const SettingsLayoutLayoutView = (props) => {
  const route = useRouter();
  const path = route.asPath;

  const getSettingsPath = (path) => {
    for (let n = 10; n < path.length; n++) {
      if (path.substring(n, n + 1) == "/") {
        return path.substring(10, n);
      }
    }
    return path.substring(10, path.length);
  };

  return (
    <Box align={"center"} h={"100%"} bgColor={"#EFEFEF"} {...props}>
      <List mt={"10px"}>
        {SettingsOptions.map((option, index) => (
          <ListItem key={index} bgColor={"#EFEFEF"}>
            {(() => {
              return getSettingsPath(path) === option.id ? (
                <SettingsLayoutSelectedPageBtn
                  title={option.title}
                  link={option.link}
                  onClose={props.onClose}
                />
              ) : (
                <SettingsLayoutPageBtn
                  title={option.title}
                  link={option.link}
                  onClose={props.onClose}
                />
              );
            })()}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SettingsLayoutLayoutView;
