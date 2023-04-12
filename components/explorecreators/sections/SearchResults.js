// FRONTEND IMPORTS

import { useContext } from "react";

import { Flex, Heading, Spinner } from "@chakra-ui/react";

import ExploreCreatorsSearchResultsCreator from "./SearchResults/Creator";

// BACKEND IMPORTS

import { UserContext } from "../../../utils/context";

const ExploreCreatorsSearchResults = (props) => {
  const { username } = useContext(UserContext);

  return (
    <Flex flexDirection={"column"} alignItems={"center"} w={"100%"}>
      {props.users !== null ? (
        props.users.length !== 0 ? (
          props.users.map((doc, index) => {
            if (doc.username !== username) {
              return (
                <ExploreCreatorsSearchResultsCreator
                  key={index}
                  link={doc.username}
                  creatorId={doc.objectID}
                  creatorData={doc}
                  displayName={doc.displayName}
                  username={doc.username}
                  photoURL={doc.photoURL}
                  numFollowers={doc.followers.length}
                  numEvents={doc.numEvents}
                  description={doc.description}
                />
              );
            }
          })
        ) : (
          <Heading
            mt={"25px"}
            fontWeight={"medium"}
            fontSize={"2xl"}
            letterSpacing={"0.05em"}
          >
            No results 😭
          </Heading>
        )
      ) : (
        <Spinner mt={"25px"} size={"xl"} />
      )}
    </Flex>
  );
};

export default ExploreCreatorsSearchResults;
