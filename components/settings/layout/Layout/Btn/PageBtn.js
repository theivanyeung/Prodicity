import Link from "next/link";

import { Button, Heading } from "@chakra-ui/react";

const SettingsLayoutPageBtn = (props) => {
  return (
    <Link href={props.link}>
      <Button
        my={"15px"}
        w={"85%"}
        h={"40px"}
        variant={"ghost"}
        borderRadius={"6px"}
        onClick={props.onClose}
      >
        <Heading fontWeight={"medium"} fontSize={"lg"}>
          {props.title}
        </Heading>
      </Button>
    </Link>
  );
};

export default SettingsLayoutPageBtn;
